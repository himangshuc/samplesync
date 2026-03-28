import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';

function PasswordInput({ value, onChange, placeholder, id }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        className="input-field pr-10"
        placeholder={placeholder || '••••••••'}
        required
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        tabIndex={-1}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

// view: 'login' | 'forgot_email' | 'forgot_reset' | 'forgot_done'
export default function Login() {
  const [tab,      setTab]      = useState('user');
  const [view,     setView]     = useState('login');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [newPw,    setNewPw]    = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const { login } = useAuth();
  const navigate   = useNavigate();

  const reset = () => {
    setView('login');
    setError('');
    setNewPw('');
    setConfirmPw('');
  };

  // ── Login ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = tab === 'user' ? '/auth/user/login' : '/auth/brand/login';
      const { data } = await api.post(endpoint, { email, password });
      login(data.token, data.user || data.brand, tab);
      navigate(tab === 'user' ? '/dashboard' : '/brand/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Forgot: check email ──
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/forgot-password/check', { email, role: tab });
      setView('forgot_reset');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // ── Forgot: reset password ──
  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (newPw !== confirmPw) { setError('Passwords do not match.'); return; }
    if (newPw.length < 8)    { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await api.post('/auth/forgot-password/reset', { email, role: tab, password: newPw });
      setView('forgot_done');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#EFEFEF] px-6 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-navy-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="font-black text-lime-500 text-2xl leading-none">*</span>
          </div>
          <h1 className="font-black text-3xl text-navy-700">
            {view === 'login'        ? 'Welcome back'       :
             view === 'forgot_email' ? 'Reset your password' :
             view === 'forgot_reset' ? 'Set new password'    :
             'Password updated!'}
          </h1>
          <p className="text-gray-500 mt-1">
            {view === 'login'        ? 'Sign in to your account'                         :
             view === 'forgot_email' ? 'Enter your email and we\'ll verify your account' :
             view === 'forgot_reset' ? `Resetting password for ${email}`                 :
             'You can now sign in with your new password.'}
          </p>
        </div>

        {/* Role tabs — shown on login + forgot flows */}
        {view !== 'forgot_done' && (
          <div className="flex bg-white rounded-xl p-1 mb-8 shadow-sm">
            {['user', 'brand'].map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(''); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  tab === t ? 'bg-navy-700 text-white shadow-sm' : 'text-navy-700/50 hover:text-navy-700'
                }`}>
                {t === 'user' ? 'Sampler' : 'Brand'}
              </button>
            ))}
          </div>
        )}

        {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm mb-5">{error}</div>}

        {/* ── LOGIN ── */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="input-field" placeholder="you@example.com" required />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" onClick={() => { setError(''); setView('forgot_email'); }}
                  className="text-xs text-navy-700/50 hover:text-navy-700 transition-colors">
                  Forgot password?
                </button>
              </div>
              <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-navy-700 text-white font-bold rounded-2xl hover:bg-navy-600 transition-colors disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}

        {/* ── FORGOT: EMAIL CHECK ── */}
        {view === 'forgot_email' && (
          <form onSubmit={handleCheckEmail} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="input-field" placeholder="you@example.com" required />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-navy-700 text-white font-bold rounded-2xl hover:bg-navy-600 transition-colors disabled:opacity-60">
              {loading ? 'Checking…' : 'Continue'}
            </button>
            <button type="button" onClick={reset}
              className="w-full flex items-center justify-center gap-2 text-sm text-navy-700/50 hover:text-navy-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </button>
          </form>
        )}

        {/* ── FORGOT: SET NEW PASSWORD ── */}
        {view === 'forgot_reset' && (
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
              <PasswordInput value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="At least 8 characters" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm new password</label>
              <PasswordInput value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Repeat your new password" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-navy-700 text-white font-bold rounded-2xl hover:bg-navy-600 transition-colors disabled:opacity-60">
              {loading ? 'Updating…' : 'Update Password'}
            </button>
            <button type="button" onClick={reset}
              className="w-full flex items-center justify-center gap-2 text-sm text-navy-700/50 hover:text-navy-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </button>
          </form>
        )}

        {/* ── FORGOT: DONE ── */}
        {view === 'forgot_done' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-lime-500 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-navy-700" />
            </div>
            <p className="text-gray-500 text-sm">Your password has been updated successfully.</p>
            <button onClick={reset}
              className="w-full py-3.5 bg-navy-700 text-white font-bold rounded-2xl hover:bg-navy-600 transition-colors">
              Sign In
            </button>
          </div>
        )}

        {view === 'login' && (
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-navy-700 font-bold hover:text-lime-500">Sign up</Link>
          </p>
        )}
      </div>
    </div>
  );
}
