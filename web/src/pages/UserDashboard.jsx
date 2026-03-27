import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import { Package, Clock, CheckCircle, AlertCircle, Star, ChevronRight, ArrowRight } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const [samples, setSamples] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionnaireDone] = useState(
    () => localStorage.getItem('questionnaire_done') === 'true'
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [samplesRes, pendingRes] = await Promise.all([
          api.get('/users/samples'),
          api.get('/feedback/pending'),
        ]);
        setSamples(samplesRes.data);
        setPending(pendingRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusIcon = (status) => {
    switch (status) {
      case 'assigned': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'shipped': return <Package className="w-4 h-4 text-blue-500" />;
      case 'delivered': return <AlertCircle className="w-4 h-4 text-brand-500" />;
      case 'feedback_received': return <CheckCircle className="w-4 h-4 text-sage-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-display text-3xl text-gray-900">Welcome back, {user?.first_name}</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your samples.</p>
      </div>

      {/* Complete-profile CTA — shown until questionnaire is done */}
      {!questionnaireDone && (
        <div className="bg-navy-700 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="text-lime-500 font-black text-3xl leading-none shrink-0">*</span>
            <div>
              <h2 className="font-bold text-xl text-white">Complete your profile</h2>
              <p className="text-white/50 text-sm mt-0.5">
                Help us match you with samples you'll actually love. Takes about 5 minutes.
              </p>
            </div>
          </div>
          <Link
            to="/questionnaire"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 bg-lime-500 text-navy-700 font-bold rounded-full hover:bg-lime-400 transition-colors text-sm"
          >
            Start <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Samples', value: samples.length, icon: Package, color: 'brand' },
          { label: 'Pending Feedback', value: pending.length, icon: AlertCircle, color: 'red' },
          { label: 'Reviews Given', value: samples.filter((s) => s.feedback_submitted).length, icon: Star, color: 'sage' },
          { label: 'Eligible', value: user?.is_eligible_next_sample ? 'Yes' : 'No', icon: CheckCircle, color: user?.is_eligible_next_sample ? 'sage' : 'gray' },
        ].map((stat, i) => (
          <div key={i} className="card p-5">
            <stat.icon className={`w-5 h-5 text-${stat.color}-500 mb-3`} />
            <div className="text-2xl font-display text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pending feedback alert */}
      {pending.length > 0 && (
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 mb-10">
          <h2 className="font-display text-xl text-gray-900 mb-1 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-brand-500" />
            Feedback Needed
          </h2>
          <p className="text-gray-600 text-sm mb-4">Submit feedback to stay eligible for your next sample.</p>
          <div className="space-y-3">
            {pending.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-white rounded-xl p-4 border border-brand-100">
                <div>
                  <div className="font-medium text-gray-900">{p.product_name}</div>
                  <div className="text-sm text-gray-500">by {p.company_name}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-brand-600 font-medium">
                    Due {new Date(p.feedback_due_at).toLocaleDateString()}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample history */}
      <div>
        <h2 className="font-display text-xl text-gray-900 mb-4">Sample History</h2>
        {samples.length === 0 ? (
          <div className="card p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-display text-lg text-gray-900 mb-1">No samples yet</h3>
            <p className="text-gray-500 text-sm">Your matched samples will appear here once campaigns go live.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {samples.map((s) => (
              <div key={s.id} className="card p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {statusIcon(s.status)}
                  <div>
                    <div className="font-medium text-gray-900">{s.product_name}</div>
                    <div className="text-sm text-gray-500">{s.company_name} · {s.campaign_title}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    s.status === 'feedback_received' ? 'bg-sage-100 text-sage-700' :
                    s.status === 'delivered' ? 'bg-brand-100 text-brand-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {s.status.replace('_', ' ')}
                  </span>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(s.assigned_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
