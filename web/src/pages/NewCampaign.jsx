import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, ArrowRight, Check, Upload } from 'lucide-react';

const PURPOSES = [
  { value: 'product_launch', label: 'Product Launch' },
  { value: 'market_research', label: 'Market Research' },
  { value: 'brand_awareness', label: 'Brand Awareness' },
  { value: 'competitive_analysis', label: 'Competitive Analysis' },
  { value: 'customer_feedback', label: 'Customer Feedback' },
];

export default function NewCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '', description: '', purpose: '',
    target_age_min: 18, target_age_max: 65, target_gender: 'all', target_locations: [], target_categories: [],
    product_name: '', product_description: '', sample_quantity: 100,
    pickup_address: '', pickup_city: '', pickup_state: '', pickup_zip: '',
    pickup_date: '', pickup_time_window: '', pickup_contact_name: '', pickup_contact_phone: '',
    price_per_sample: 3.50, start_date: '', end_date: '',
  });

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await api.post('/campaigns', form);
      navigate('/brand/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create campaign.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <button onClick={() => navigate('/brand/dashboard')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <h1 className="font-display text-3xl text-gray-900 mb-2">Create a Campaign</h1>
      <p className="text-gray-500 mb-8">Fill in the details below to launch your sampling campaign.</p>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-sage-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm mb-5">{error}</div>}

      {/* Step 1: Campaign basics */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl">Campaign Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
            <input className="input-field" placeholder="e.g. Summer Serum Launch" value={form.title} onChange={(e) => update('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="input-field min-h-[100px]" placeholder="Describe what this campaign is about..." value={form.description} onChange={(e) => update('description', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sampling Purpose</label>
            <div className="grid grid-cols-2 gap-2">
              {PURPOSES.map((p) => (
                <button key={p.value} type="button" onClick={() => update('purpose', p.value)}
                  className={`p-3 rounded-xl text-sm font-medium text-left border transition-all ${
                    form.purpose === p.value ? 'bg-sage-600 text-white border-sage-600' : 'bg-white text-gray-600 border-gray-200 hover:border-sage-300'
                  }`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Targeting */}
      {step === 2 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl">Target Demographics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Age</label>
              <input type="number" className="input-field" value={form.target_age_min} onChange={(e) => update('target_age_min', parseInt(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Age</label>
              <input type="number" className="input-field" value={form.target_age_max} onChange={(e) => update('target_age_max', parseInt(e.target.value))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Gender</label>
            <select className="input-field" value={form.target_gender} onChange={(e) => update('target_gender', e.target.value)}>
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <h2 className="font-display text-xl pt-4">Product Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input className="input-field" value={form.product_name} onChange={(e) => update('product_name', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
            <textarea className="input-field min-h-[80px]" value={form.product_description} onChange={(e) => update('product_description', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sample Quantity</label>
              <input type="number" min="1" className="input-field" value={form.sample_quantity} onChange={(e) => update('sample_quantity', parseInt(e.target.value))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Sample ($)</label>
              <input type="number" step="0.01" className="input-field" value={form.price_per_sample} onChange={(e) => update('price_per_sample', parseFloat(e.target.value))} />
            </div>
          </div>
          <div className="bg-sage-50 rounded-xl p-4 text-sm">
            <span className="font-medium text-sage-700">Estimated Total: </span>
            <span className="text-sage-900 font-semibold">${(form.sample_quantity * form.price_per_sample).toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Step 3: Pickup details */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl">Pickup Details</h2>
          <p className="text-sm text-gray-500">Where should we pick up the samples?</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
            <input className="input-field" value={form.pickup_address} onChange={(e) => update('pickup_address', e.target.value)} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input className="input-field" value={form.pickup_city} onChange={(e) => update('pickup_city', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input className="input-field" value={form.pickup_state} onChange={(e) => update('pickup_state', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
              <input className="input-field" value={form.pickup_zip} onChange={(e) => update('pickup_zip', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <input type="date" className="input-field" value={form.pickup_date} onChange={(e) => update('pickup_date', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Window</label>
              <input className="input-field" placeholder="e.g. 9 AM – 5 PM" value={form.pickup_time_window} onChange={(e) => update('pickup_time_window', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input className="input-field" value={form.pickup_contact_name} onChange={(e) => update('pickup_contact_name', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input className="input-field" value={form.pickup_contact_phone} onChange={(e) => update('pickup_contact_phone', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Timeline */}
      {step === 4 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl">Campaign Timeline</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" className="input-field" value={form.start_date} onChange={(e) => update('start_date', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="date" className="input-field" value={form.end_date} onChange={(e) => update('end_date', e.target.value)} />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-2xl p-6 mt-6 space-y-3">
            <h3 className="font-display text-lg text-gray-900">Campaign Summary</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Campaign</span><span className="font-medium">{form.title}</span>
              <span className="text-gray-500">Product</span><span className="font-medium">{form.product_name}</span>
              <span className="text-gray-500">Purpose</span><span className="font-medium capitalize">{form.purpose.replace('_', ' ')}</span>
              <span className="text-gray-500">Samples</span><span className="font-medium">{form.sample_quantity}</span>
              <span className="text-gray-500">Total Cost</span><span className="font-semibold text-sage-700">${(form.sample_quantity * form.price_per_sample).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {step < 4 ? (
          <button onClick={() => setStep(step + 1)} className="btn-secondary gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className="btn-secondary gap-2 disabled:opacity-60">
            {loading ? 'Creating…' : 'Create Campaign'} <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
