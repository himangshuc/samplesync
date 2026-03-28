import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

const PURPOSES = [
  { value: 'product_launch',       label: 'Product Launch' },
  { value: 'market_research',      label: 'Market Research' },
  { value: 'brand_awareness',      label: 'Brand Awareness' },
  { value: 'competitive_analysis', label: 'Competitive Analysis' },
  { value: 'customer_feedback',    label: 'Customer Feedback' },
];

const PRODUCT_CATEGORIES = [
  { value: 'food_beverage',   label: 'Food & Beverage',      emoji: '🍳' },
  { value: 'snacks_drinks',   label: 'Snacks & Drinks',      emoji: '🥤' },
  { value: 'beauty_skincare', label: 'Beauty & Skincare',    emoji: '🧴' },
  { value: 'health_wellness', label: 'Health & Wellness',    emoji: '💊' },
  { value: 'home_lifestyle',  label: 'Home & Lifestyle',     emoji: '🛋️' },
  { value: 'tech_gadgets',    label: 'Tech & Gadgets',       emoji: '📱' },
  { value: 'fashion_apparel', label: 'Fashion & Apparel',    emoji: '👔' },
  { value: 'pet_care',        label: 'Pet Care',             emoji: '🐾' },
];

const Req = () => <span className="text-red-500 ml-0.5">*</span>;

export default function NewCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '', description: '', purpose: '',
    target_age_min: 18, target_age_max: 65, target_gender: 'all', target_locations: [], target_categories: [],
    product_name: '', product_description: '', product_dimensions: '', product_weight: '',
    sample_quantity: 100,
    pickup_address: '', pickup_city: '', pickup_state: '', pickup_zip: '',
    pickup_date: '', pickup_time_window: '', pickup_contact_name: '', pickup_contact_phone: '',
    start_date: '', end_date: '',
  });

  const [locationInput, setLocationInput] = useState('');

  const update = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const toggleCategory = (val) => setForm((p) => ({
    ...p,
    target_categories: p.target_categories.includes(val)
      ? p.target_categories.filter(c => c !== val)
      : [...p.target_categories, val],
  }));

  const addLocation = (e) => {
    if (e.key === 'Enter' && locationInput.trim()) {
      e.preventDefault();
      const loc = locationInput.trim();
      if (!form.target_locations.includes(loc)) {
        update('target_locations', [...form.target_locations, loc]);
      }
      setLocationInput('');
    }
  };

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
          <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-lime-500' : 'bg-gray-200'}`} />
        ))}
      </div>

      {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm mb-5">{error}</div>}

      {/* Step 1: Campaign basics */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl">Campaign Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title<Req /></label>
            <input className="input-field" placeholder="e.g. Summer Serum Launch" value={form.title} onChange={(e) => update('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="input-field min-h-[100px]" placeholder="Describe what this campaign is about..." value={form.description} onChange={(e) => update('description', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sampling Purpose<Req /></label>
            <div className="grid grid-cols-2 gap-2">
              {PURPOSES.map((p) => (
                <button key={p.value} type="button" onClick={() => update('purpose', p.value)}
                  className={`p-3 rounded-xl text-sm font-medium text-left border transition-all ${
                    form.purpose === p.value ? 'bg-navy-700 text-white border-navy-700' : 'bg-white text-gray-600 border-gray-200 hover:border-navy-400'
                  }`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Product & Targeting */}
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

          {/* Product Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories<Req /></label>
            <p className="text-xs text-gray-400 mb-3">Used to match samplers who have completed relevant questionnaire branches.</p>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCT_CATEGORIES.map((c) => (
                <button key={c.value} type="button" onClick={() => toggleCategory(c.value)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium text-left border transition-all ${
                    form.target_categories.includes(c.value)
                      ? 'bg-navy-700 text-white border-navy-700'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-navy-400'
                  }`}>
                  <span>{c.emoji}</span>{c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target States */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target States / Regions</label>
            <p className="text-xs text-gray-400 mb-2">Type a state name and press Enter to add. Leave blank to target all of India.</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.target_locations.map((loc) => (
                <span key={loc} className="inline-flex items-center gap-1 px-3 py-1 bg-navy-700/10 text-navy-700 text-sm rounded-full font-medium">
                  {loc}
                  <button type="button" onClick={() => update('target_locations', form.target_locations.filter(l => l !== loc))}
                    className="text-navy-700/50 hover:text-navy-700 ml-0.5">×</button>
                </span>
              ))}
            </div>
            <input
              className="input-field"
              placeholder="e.g. Maharashtra, Karnataka…"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={addLocation}
            />
          </div>

          <h2 className="font-display text-xl pt-4">Product Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name<Req /></label>
            <input className="input-field" value={form.product_name} onChange={(e) => update('product_name', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
            <textarea className="input-field min-h-[80px]" value={form.product_description} onChange={(e) => update('product_description', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions<Req /></label>
              <input className="input-field" placeholder="e.g. 10 × 5 × 3 cm" value={form.product_dimensions} onChange={(e) => update('product_dimensions', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight<Req /></label>
              <input className="input-field" placeholder="e.g. 250 g" value={form.product_weight} onChange={(e) => update('product_weight', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sample Quantity<Req /></label>
            <input type="number" min="1" className="input-field" value={form.sample_quantity} onChange={(e) => update('sample_quantity', parseInt(e.target.value))} />
          </div>
        </div>
      )}

      {/* Step 3: Pickup details */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl">Pickup Details</h2>
          <p className="text-sm text-gray-500">Where should we pick up the samples?</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address<Req /></label>
            <PlacesAutocomplete
              className="input-field"
              placeholder="Start typing pickup address…"
              value={form.pickup_address}
              onChange={(v) => update('pickup_address', v)}
              onSelect={(p) => setForm((f) => ({
                ...f,
                pickup_address: p.address_line1,
                pickup_city:    p.city    || f.pickup_city,
                pickup_state:   p.state   || f.pickup_state,
                pickup_zip:     p.zip_code || f.pickup_zip,
              }))}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City<Req /></label>
              <input className="input-field" value={form.pickup_city} onChange={(e) => update('pickup_city', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State<Req /></label>
              <input className="input-field" value={form.pickup_state} onChange={(e) => update('pickup_state', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code<Req /></label>
              <input
                className="input-field"
                inputMode="numeric"
                maxLength={6}
                value={form.pickup_zip}
                onChange={(e) => update('pickup_zip', e.target.value.replace(/\D/g, '').slice(0, 6))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date<Req /></label>
              <input type="date" className="input-field" value={form.pickup_date} onChange={(e) => update('pickup_date', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Window</label>
              <input className="input-field" placeholder="e.g. 9 AM – 5 PM" value={form.pickup_time_window} onChange={(e) => update('pickup_time_window', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name<Req /></label>
              <input className="input-field" value={form.pickup_contact_name} onChange={(e) => update('pickup_contact_name', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone<Req /></label>
              <input
                className="input-field"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit number"
                value={form.pickup_contact_phone}
                onChange={(e) => update('pickup_contact_phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date<Req /></label>
              <input type="date" className="input-field" value={form.start_date} onChange={(e) => update('start_date', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date<Req /></label>
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
              <span className="text-gray-500">Dimensions</span><span className="font-medium">{form.product_dimensions || '—'}</span>
              <span className="text-gray-500">Weight</span><span className="font-medium">{form.product_weight || '—'}</span>
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
