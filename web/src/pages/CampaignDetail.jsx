import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, Package, Users, MapPin, Calendar, DollarSign, Tag, Target, Truck, ExternalLink, Loader2, Zap, CheckCircle } from 'lucide-react';

function displayStatus(c) {
  if (c.campaign_status === 'completed') return 'completed';
  if (!c.start_date) return 'draft';
  const now   = new Date();
  const start = new Date(c.start_date);
  const end   = c.end_date ? new Date(c.end_date) : null;
  if (end && end < now) return 'completed';
  if (start > now)      return 'scheduled';
  return 'active';
}

const STATUS_STYLES = {
  draft:     'bg-yellow-100 text-yellow-700',
  scheduled: 'bg-blue-100 text-blue-700',
  active:    'bg-lime-100 text-lime-700',
  completed: 'bg-gray-100 text-gray-500',
};

function Field({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div>
      <dt className="text-xs font-semibold text-navy-700/40 uppercase tracking-widest mb-1">{label}</dt>
      <dd className="text-sm text-navy-700 font-medium">{value}</dd>
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Icon className="w-4 h-4 text-navy-700/40" />
        <h2 className="font-bold text-navy-700 text-sm uppercase tracking-widest">{title}</h2>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</dl>
    </div>
  );
}

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign,    setCampaign]    = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [shipLoading,    setShipLoading]    = useState({}); // keyed by assignment id
  const [candidates,     setCandidates]     = useState(null); // null = not previewed
  const [matchLoading,   setMatchLoading]   = useState(false);
  const [matchResult,    setMatchResult]    = useState(null);

  useEffect(() => {
    Promise.all([
      api.get(`/campaigns/${id}`),
      api.get(`/shipments/campaign/${id}`).catch(() => ({ data: [] })),
    ]).then(([campRes, assignRes]) => {
      setCampaign(campRes.data);
      setAssignments(assignRes.data);
    }).catch(() => setError('Campaign not found.')).finally(() => setLoading(false));
  }, [id]);

  const handlePreviewCandidates = async () => {
    setMatchLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/matching/candidates/${id}`);
      setCandidates(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch candidates.');
    } finally {
      setMatchLoading(false);
    }
  };

  const handleRunMatching = async () => {
    setMatchLoading(true);
    setError('');
    try {
      const { data } = await api.post(`/matching/run/${id}`);
      setMatchResult(data);
      // Reload assignments
      const assignRes = await api.get(`/shipments/campaign/${id}`).catch(() => ({ data: [] }));
      setAssignments(assignRes.data);
      setCandidates(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to run matching.');
    } finally {
      setMatchLoading(false);
    }
  };

  const handleCreateShipment = async (assignmentId) => {
    setShipLoading(p => ({ ...p, [assignmentId]: 'create' }));
    setError('');
    try {
      const { data } = await api.post(`/shipments/create/${assignmentId}`);
      setAssignments(p => p.map(a => a.id === assignmentId ? { ...a, ...data } : a));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create shipment.');
    } finally {
      setShipLoading(p => ({ ...p, [assignmentId]: null }));
    }
  };

  const handleSchedulePickup = async (assignmentId) => {
    setShipLoading(p => ({ ...p, [assignmentId]: 'pickup' }));
    setError('');
    try {
      await api.post(`/shipments/pickup/${assignmentId}`);
      setAssignments(p => p.map(a => a.id === assignmentId ? { ...a, pickup_scheduled_at: new Date().toISOString() } : a));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to schedule pickup.');
    } finally {
      setShipLoading(p => ({ ...p, [assignmentId]: null }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-500">{error || 'Campaign not found.'}</p>
        <button onClick={() => navigate('/brand/dashboard')} className="mt-4 text-navy-700 font-semibold hover:underline">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const ds        = displayStatus(campaign);
  const totalCost = parseFloat(campaign.total_cost || 0);

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <button
        onClick={() => navigate('/brand/dashboard')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl text-gray-900">{campaign.title}</h1>
          <p className="text-gray-500 mt-1">{campaign.product_name}</p>
        </div>
        <span className={`shrink-0 inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${STATUS_STYLES[ds]}`}>
          {ds}
        </span>
      </div>

      <div className="space-y-4">
        {/* Overview */}
        <Section title="Overview" icon={Package}>
          <Field label="Campaign Title" value={campaign.title} />
          <Field label="Purpose" value={campaign.purpose?.replace(/_/g, ' ')} />
          <Field label="Description" value={campaign.description} />
          <Field label="Sample Quantity" value={`${campaign.sample_quantity} samples`} />
        </Section>

        {/* Product */}
        <Section title="Product" icon={Tag}>
          <Field label="Product Name"        value={campaign.product_name} />
          <Field label="Product Description" value={campaign.product_description} />
          <Field label="Dimensions"          value={campaign.product_dimensions} />
          <Field label="Weight"              value={campaign.product_weight} />
        </Section>

        {/* Target Audience */}
        <Section title="Target Audience" icon={Target}>
          <Field label="Age Range" value={campaign.target_age_min || campaign.target_age_max ? `${campaign.target_age_min ?? '—'} – ${campaign.target_age_max ?? '—'}` : null} />
          <Field label="Gender" value={campaign.target_gender} />
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold text-navy-700/40 uppercase tracking-widest mb-2">Target States</dt>
            {campaign.target_locations?.length ? (
              <div className="flex flex-wrap gap-2">
                {campaign.target_locations.map(loc => (
                  <span key={loc} className="inline-flex px-3 py-1 bg-navy-700/8 text-navy-700 text-xs font-semibold rounded-full border border-navy-700/20">{loc}</span>
                ))}
              </div>
            ) : (
              <dd className="text-sm text-navy-700/40 italic">All India</dd>
            )}
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold text-navy-700/40 uppercase tracking-widest mb-2">Product Categories</dt>
            {campaign.target_categories?.length ? (
              <div className="flex flex-wrap gap-2">
                {campaign.target_categories.map(cat => (
                  <span key={cat} className="inline-flex px-3 py-1 bg-lime-50 text-lime-700 text-xs font-semibold rounded-full border border-lime-200">{cat.replace(/_/g, ' ')}</span>
                ))}
              </div>
            ) : (
              <dd className="text-sm text-navy-700/40 italic">All categories</dd>
            )}
          </div>
        </Section>

        {/* Schedule */}
        <Section title="Schedule" icon={Calendar}>
          <Field label="Start Date" value={fmt(campaign.start_date)} />
          <Field label="End Date"   value={fmt(campaign.end_date)} />
        </Section>

        {/* Pickup */}
        {(campaign.pickup_address || campaign.pickup_city) && (
          <Section title="Pickup Details" icon={MapPin}>
            <Field label="Address"       value={campaign.pickup_address} />
            <Field label="City"          value={campaign.pickup_city} />
            <Field label="State"         value={campaign.pickup_state} />
            <Field label="ZIP"           value={campaign.pickup_zip} />
            <Field label="Date"          value={fmt(campaign.pickup_date)} />
            <Field label="Time Window"   value={campaign.pickup_time_window} />
            <Field label="Contact Name"  value={campaign.pickup_contact_name} />
            <Field label="Contact Phone" value={campaign.pickup_contact_phone} />
          </Section>
        )}

        {/* Financials */}
        <Section title="Financials" icon={DollarSign}>
          <Field label="Total Cost"     value={totalCost ? `$${totalCost.toLocaleString()}` : null} />
          <Field label="Payment Status" value={campaign.payment_status} />
        </Section>

        {/* ── Sampler Matching ── */}
        {assignments.length < campaign.sample_quantity && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4 text-navy-700/40" />
              <h2 className="font-bold text-navy-700 text-sm uppercase tracking-widest">Sampler Matching</h2>
            </div>

            {matchResult ? (
              <div className="flex items-center gap-3 p-4 bg-lime-50 rounded-xl border border-lime-200">
                <CheckCircle className="w-5 h-5 text-lime-600 shrink-0" />
                <p className="text-sm font-medium text-lime-800">
                  Matched {matchResult.matched} sampler{matchResult.matched !== 1 ? 's' : ''} successfully.
                </p>
              </div>
            ) : candidates ? (
              <div>
                <p className="text-sm text-navy-700/60 mb-4">
                  Found <span className="font-bold text-navy-700">{candidates.candidates.length}</span> eligible samplers
                  out of {candidates.total_eligible} total.
                  {candidates.slots_remaining > 0 && ` ${candidates.slots_remaining} slot${candidates.slots_remaining !== 1 ? 's' : ''} remaining.`}
                </p>
                {candidates.candidates.length > 0 && (
                  <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                    {candidates.candidates.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-gray-50">
                        <span className="font-medium text-navy-700">{c.name}</span>
                        <div className="flex items-center gap-3 text-navy-700/50">
                          <span>{c.city}, {c.state}</span>
                          <span className="font-bold text-lime-600">{c.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={handleRunMatching}
                    disabled={matchLoading || candidates.candidates.length === 0}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-navy-700 text-white text-sm font-bold rounded-full hover:bg-navy-600 transition-colors disabled:opacity-40"
                  >
                    {matchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    Assign {candidates.candidates.length} Samplers
                  </button>
                  <button onClick={() => setCandidates(null)} className="text-sm text-gray-400 hover:text-gray-600">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-navy-700/50">
                  {assignments.length > 0
                    ? `${assignments.length} of ${campaign.sample_quantity} slots filled.`
                    : 'No samplers assigned yet. Run matching to find the best fit.'}
                </p>
                <button
                  onClick={handlePreviewCandidates}
                  disabled={matchLoading}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-navy-700 text-white text-sm font-bold rounded-full hover:bg-navy-600 transition-colors disabled:opacity-40"
                >
                  {matchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  Preview Matches
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sampler Assignments & Shipments */}
        {assignments.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Truck className="w-4 h-4 text-navy-700/40" />
              <h2 className="font-bold text-navy-700 text-sm uppercase tracking-widest">Sampler Assignments</h2>
            </div>
            <div className="space-y-3">
              {assignments.map((a) => {
                const isLoadingCreate = shipLoading[a.id] === 'create';
                const isLoadingPickup = shipLoading[a.id] === 'pickup';
                return (
                  <div key={a.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <p className="font-semibold text-navy-700 text-sm">{a.first_name} {a.last_name}</p>
                        <p className="text-xs text-navy-700/40">{a.city}, {a.state}</p>
                        {a.awb_code && (
                          <p className="text-xs text-navy-700/60 mt-1">
                            {a.courier_name} · AWB: <span className="font-mono font-semibold">{a.awb_code}</span>
                          </p>
                        )}
                        {a.last_tracking_status && (
                          <p className="text-xs text-navy-700/50 mt-0.5">{a.last_tracking_status}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Status badge */}
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          a.status === 'delivered' || a.status === 'feedback_received' ? 'bg-lime-100 text-lime-700' :
                          a.status === 'shipped'   ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>{a.status.replace('_', ' ')}</span>

                        {/* Track link */}
                        {a.tracking_url && (
                          <a href={a.tracking_url} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-navy-700 font-semibold hover:text-lime-600">
                            Track <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {/* Schedule pickup */}
                        {a.awb_code && !a.pickup_scheduled_at && (
                          <button
                            onClick={() => handleSchedulePickup(a.id)}
                            disabled={isLoadingPickup}
                            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 border border-navy-700 text-navy-700 font-semibold rounded-full hover:bg-navy-700 hover:text-white transition-colors disabled:opacity-50"
                          >
                            {isLoadingPickup ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Schedule Pickup'}
                          </button>
                        )}
                        {a.pickup_scheduled_at && (
                          <span className="text-xs text-lime-600 font-semibold">Pickup scheduled ✓</span>
                        )}

                        {/* Create shipment */}
                        {!a.awb_code && (
                          <button
                            onClick={() => handleCreateShipment(a.id)}
                            disabled={isLoadingCreate || a.status !== 'assigned'}
                            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-navy-700 text-white font-semibold rounded-full hover:bg-navy-600 transition-colors disabled:opacity-40"
                          >
                            {isLoadingCreate ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Truck className="w-3 h-3" /> Ship</>}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
