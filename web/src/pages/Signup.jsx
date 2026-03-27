import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import { ArrowRight, ArrowLeft, Check, Eye, EyeOff } from 'lucide-react';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

const CATEGORIES = ['Skincare', 'Haircare', 'Snacks', 'Beverages', 'Wellness', 'Tech', 'Pet Products', 'Home & Kitchen', 'Baby & Kids', 'Fitness'];
const DIETARY = ['None', 'Gluten-free', 'Vegan', 'Vegetarian', 'Dairy-free', 'Nut-free', 'Keto', 'Halal', 'Kosher'];

const Req = () => <span className="text-red-500 ml-0.5">*</span>;

function PasswordInput({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        className="input-field pr-10"
        placeholder={placeholder || 'At least 8 characters'}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        tabIndex={-1}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function Signup() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'user';
  const [tab, setTab] = useState(initialRole);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // User fields
  const [userForm, setUserForm] = useState({
    email: '', password: '', first_name: '', last_name: '', phone: '',
    date_of_birth: '', gender: '',
    product_categories: [], dietary_restrictions: [], skin_type: '', household_size: 1, has_pets: false,
    address_line1: '', address_line2: '', city: '', state: '', zip_code: '',
  });

  // Brand fields
  const [brandForm, setBrandForm] = useState({
    email: '', password: '', company_name: '', contact_name: '', phone: '',
    website: '', industry: '', company_size: '', description: '',
  });

  const updateUser  = (key, val) => setUserForm((p) => ({ ...p, [key]: val }));
  const updateBrand = (key, val) => setBrandForm((p) => ({ ...p, [key]: val }));

  const toggleArray = (key, val) => {
    setUserForm((p) => ({
      ...p,
      [key]: p[key].includes(val) ? p[key].filter((v) => v !== val) : [...p[key], val],
    }));
  };

  const totalSteps = tab === 'user' ? 3 : 2;

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      if (tab === 'user') {
        const { data } = await api.post('/auth/user/signup', userForm);
        login(data.token, data.user, 'user');
        navigate('/dashboard');
      } else {
        const { data } = await api.post('/auth/brand/signup', brandForm);
        login(data.token, data.brand, 'brand');
        navigate('/brand/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.[0]?.msg || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#EFEFEF] px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-navy-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="font-black text-lime-500 text-2xl leading-none">*</span>
          </div>
          <h1 className="font-black text-3xl text-navy-700">Create your account</h1>
        </div>

        {/* Role tabs */}
        <div className="flex bg-white rounded-xl p-1 mb-6 shadow-sm">
          {['user', 'brand'].map((t) => (
            <button key={t} onClick={() => { setTab(t); setStep(1); setError(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                tab === t ? 'bg-navy-700 text-white shadow-sm' : 'text-navy-700/50 hover:text-navy-700'
              }`}>
              {t === 'user' ? 'Sampler' : 'Brand'}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? 'bg-lime-500' : 'bg-navy-700/15'}`} />
          ))}
        </div>

        {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm mb-5">{error}</div>}

        {/* ── USER FORM ── */}
        {tab === 'user' && (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl mb-2">Your Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name<Req /></label>
                    <input className="input-field" value={userForm.first_name} onChange={(e) => updateUser('first_name', e.target.value)} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name<Req /></label>
                    <input className="input-field" value={userForm.last_name} onChange={(e) => updateUser('last_name', e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email<Req /></label>
                  <input type="email" className="input-field" value={userForm.email} onChange={(e) => updateUser('email', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password<Req /></label>
                  <PasswordInput value={userForm.password} onChange={(e) => updateUser('password', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" className="input-field" value={userForm.date_of_birth} onChange={(e) => updateUser('date_of_birth', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      className="input-field"
                      placeholder="10-digit mobile number"
                      inputMode="numeric"
                      maxLength={10}
                      value={userForm.phone}
                      onChange={(e) => updateUser('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select className="input-field" value={userForm.gender} onChange={(e) => updateUser('gender', e.target.value)}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-xl mb-2">Your Preferences</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Product categories you're interested in</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
                      <button key={c} type="button" onClick={() => toggleArray('product_categories', c.toLowerCase())}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                          userForm.product_categories.includes(c.toLowerCase())
                            ? 'bg-navy-700 text-white border-navy-700'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-navy-700/40'
                        }`}>
                        {userForm.product_categories.includes(c.toLowerCase()) && <Check className="w-3.5 h-3.5 inline mr-1" />}
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Dietary restrictions</label>
                  <div className="flex flex-wrap gap-2">
                    {DIETARY.map((d) => (
                      <button key={d} type="button" onClick={() => toggleArray('dietary_restrictions', d.toLowerCase())}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                          userForm.dietary_restrictions.includes(d.toLowerCase())
                            ? 'bg-lime-500 text-navy-700 border-lime-500'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-lime-400'
                        }`}>
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Household Size</label>
                    <input type="number" min="1" className="input-field" value={userForm.household_size} onChange={(e) => updateUser('household_size', parseInt(e.target.value))} />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer py-3">
                      <input type="checkbox" checked={userForm.has_pets} onChange={(e) => updateUser('has_pets', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-navy-700 focus:ring-navy-700" />
                      <span className="text-sm font-medium text-gray-700">I have pets</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl mb-2">Delivery Address</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1<Req /></label>
                  <PlacesAutocomplete
                    className="input-field"
                    placeholder="Start typing your address…"
                    value={userForm.address_line1}
                    onChange={(v) => updateUser('address_line1', v)}
                    onSelect={(p) => setUserForm((f) => ({ ...f,
                      address_line1: p.address_line1,
                      address_line2: p.address_line2 || f.address_line2,
                      city: p.city || f.city,
                      state: p.state || f.state,
                      zip_code: p.zip_code || f.zip_code,
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                  <input className="input-field" placeholder="Apt, suite, etc." value={userForm.address_line2} onChange={(e) => updateUser('address_line2', e.target.value)} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City<Req /></label>
                    <input className="input-field" value={userForm.city} onChange={(e) => updateUser('city', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State<Req /></label>
                    <input className="input-field" value={userForm.state} onChange={(e) => updateUser('state', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code<Req /></label>
                    <input
                      className="input-field"
                      value={userForm.zip_code}
                      maxLength={6}
                      inputMode="numeric"
                      onChange={(e) => updateUser('zip_code', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── BRAND FORM ── */}
        {tab === 'brand' && (
          <>
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl mb-2">Company Details</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name<Req /></label>
                  <input className="input-field" value={brandForm.company_name} onChange={(e) => updateBrand('company_name', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name<Req /></label>
                  <input className="input-field" value={brandForm.contact_name} onChange={(e) => updateBrand('contact_name', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email<Req /></label>
                  <input type="email" className="input-field" value={brandForm.email} onChange={(e) => updateBrand('email', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password<Req /></label>
                  <PasswordInput value={brandForm.password} onChange={(e) => updateBrand('password', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    className="input-field"
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength={10}
                    value={brandForm.phone}
                    onChange={(e) => updateBrand('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl mb-2">About Your Brand</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input className="input-field" placeholder="https://..." value={brandForm.website} onChange={(e) => updateBrand('website', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry<Req /></label>
                  <select className="input-field" value={brandForm.industry} onChange={(e) => updateBrand('industry', e.target.value)}>
                    <option value="">Select industry</option>
                    {['Beauty & Skincare', 'Food & Beverage', 'Health & Wellness', 'Pet Products', 'Home & Kitchen', 'Tech & Electronics', 'Baby & Kids', 'Fitness', 'Other'].map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                  <select className="input-field" value={brandForm.company_size} onChange={(e) => updateBrand('company_size', e.target.value)}>
                    <option value="">Select size</option>
                    {['1-10', '10-50', '50-200', '200-1000', '1000+'].map((s) => (
                      <option key={s} value={s}>{s} employees</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="input-field min-h-[100px]" placeholder="Tell us about your brand..." value={brandForm.description} onChange={(e) => updateBrand('description', e.target.value)} />
                </div>
              </div>
            )}
          </>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button onClick={() => setStep(step + 1)} className="btn-primary gap-2">
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} className="btn-primary gap-2 disabled:opacity-60">
              {loading ? 'Creating…' : 'Create Account'} <Check className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-navy-700 font-bold hover:text-lime-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
