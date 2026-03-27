import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, Package, Users, MapPin, Calendar, Clock, DollarSign, Tag, Target } from 'lucide-react';

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
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/campaigns/${id}`)
      .then(({ data }) => setCampaign(data))
      .catch(() => setError('Campaign not found.'))
      .finally(() => setLoading(false));
  }, [id]);

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
          <Field label="Locations" value={campaign.target_locations?.length ? campaign.target_locations.join(', ') : null} />
          <Field label="Categories" value={campaign.target_categories?.length ? campaign.target_categories.join(', ') : null} />
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
          <Field label="Price per Sample" value={campaign.price_per_sample ? `$${parseFloat(campaign.price_per_sample).toFixed(2)}` : null} />
          <Field label="Total Cost"       value={`$${totalCost.toLocaleString()}`} />
          <Field label="Payment Status"   value={campaign.payment_status} />
        </Section>
      </div>
    </div>
  );
}
