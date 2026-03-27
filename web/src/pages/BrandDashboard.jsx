import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Plus, Package, BarChart3, Clock, CheckCircle, DollarSign, ChevronRight } from 'lucide-react';

/** Derive a display status from campaign data */
function displayStatus(c) {
  if (c.campaign_status === 'draft') return 'draft';
  if (c.campaign_status === 'completed') return 'completed';
  // active in the DB but start_date is in the future → scheduled
  if (c.start_date && new Date(c.start_date) > new Date()) return 'scheduled';
  return 'active';
}

const STATUS_STYLES = {
  draft:     'bg-yellow-100 text-yellow-700',
  scheduled: 'bg-blue-100 text-blue-700',
  active:    'bg-lime-100 text-lime-700',
  completed: 'bg-gray-100 text-gray-500',
};

export default function BrandDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/campaigns/my');
        setCampaigns(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-navy-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statuses = campaigns.map(displayStatus);
  const activeCount    = statuses.filter(s => s === 'active').length;
  const scheduledCount = statuses.filter(s => s === 'scheduled').length;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-display text-3xl text-gray-900">Brand Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your sampling campaigns.</p>
        </div>
        <Link to="/brand/campaigns/new" className="btn-secondary gap-2">
          <Plus className="w-5 h-5" /> New Campaign
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Campaigns', value: campaigns.length,  icon: Package },
          { label: 'Active',          value: activeCount,        icon: CheckCircle },
          { label: 'Scheduled',       value: scheduledCount,     icon: Clock },
          { label: 'Total Spend',     value: `$${campaigns.reduce((s, c) => s + parseFloat(c.total_cost || 0), 0).toLocaleString()}`, icon: DollarSign },
        ].map((stat, i) => (
          <div key={i} className="card p-5">
            <stat.icon className="w-5 h-5 text-navy-700/50 mb-3" />
            <div className="text-2xl font-display text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Campaign list */}
      <div>
        <h2 className="font-display text-xl text-gray-900 mb-4">Your Campaigns</h2>
        {campaigns.length === 0 ? (
          <div className="card p-12 text-center">
            <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-display text-lg text-gray-900 mb-1">No campaigns yet</h3>
            <p className="text-gray-500 text-sm mb-6">Create your first campaign to start reaching consumers.</p>
            <Link to="/brand/campaigns/new" className="btn-secondary">Create Campaign</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {campaigns.map((c) => {
              const ds = displayStatus(c);
              return (
                <Link key={c.id} to={`/brand/campaigns/${c.id}`}
                  className="card p-5 flex items-center justify-between hover:border-navy-200 transition-colors block">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-700/5 flex items-center justify-center">
                      <Package className="w-5 h-5 text-navy-700/50" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{c.title}</div>
                      <div className="text-sm text-gray-500">{c.product_name} · {c.sample_quantity} samples</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[ds]}`}>
                      {ds}
                    </span>
                    <span className="text-sm text-gray-500">${parseFloat(c.total_cost || 0).toLocaleString()}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
