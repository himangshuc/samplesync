import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Package, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl text-gray-900">SampleSync</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!role ? (
            <>
              <Link to="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">How It Works</Link>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log In</Link>
              <Link to="/signup" className="btn-primary text-sm !py-2 !px-5">Get Started</Link>
            </>
          ) : role === 'user' ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">My Samples</Link>
              <Link to="/browse" className="text-sm font-medium text-gray-600 hover:text-gray-900">Browse</Link>
              <span className="text-sm text-gray-400">Hi, {user?.first_name}</span>
              <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-600">Log Out</button>
            </>
          ) : (
            <>
              <Link to="/brand/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link to="/brand/campaigns/new" className="text-sm font-medium text-gray-600 hover:text-gray-900">New Campaign</Link>
              <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-red-600">Log Out</button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 pb-4 space-y-3">
          {!role ? (
            <>
              <Link to="/how-it-works" className="block text-sm font-medium text-gray-600" onClick={() => setOpen(false)}>How It Works</Link>
              <Link to="/login" className="block text-sm font-medium text-gray-600" onClick={() => setOpen(false)}>Log In</Link>
              <Link to="/signup" className="block btn-primary text-sm text-center" onClick={() => setOpen(false)}>Get Started</Link>
            </>
          ) : (
            <>
              <Link to={role === 'user' ? '/dashboard' : '/brand/dashboard'} className="block text-sm font-medium text-gray-600" onClick={() => setOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="block text-sm font-medium text-red-600">Log Out</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
