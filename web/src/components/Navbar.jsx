import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, X } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 bg-[#EFEFEF]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-0.5">
          <span className="font-display font-bold text-xl text-navy-700 tracking-tight">SampleSync</span>
          <span className="font-bold text-xl text-lime-500 leading-none">*</span>
        </Link>

        {/* Desktop nav — pill container */}
        <div className="hidden md:flex items-center gap-1 bg-navy-700 rounded-full px-2 py-1.5">
          {!role ? (
            <>
              <Link to="/"           className="text-sm font-medium text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Home</Link>
              <a    href="/#how-it-works" className="text-sm font-medium text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">How it works</a>
              <Link to="/signup"     className="text-sm font-medium text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Signup</Link>
              <Link to="/contact"    className="text-sm font-medium text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Contact</Link>
            </>
          ) : role === 'user' ? (
            <>
              <Link to="/dashboard"    className="text-sm font-medium text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">My Samples</Link>
              <Link to="/browse"       className="text-sm font-medium text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Browse</Link>
              <span className="text-sm text-white/60 px-3">Hi, {user?.first_name}</span>
              <button onClick={handleLogout} className="text-sm font-medium text-white/80 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Log Out</button>
            </>
          ) : (
            <>
              <Link to="/brand/dashboard"      className="text-sm font-medium text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Dashboard</Link>
              <Link to="/brand/campaigns/new"  className="text-sm font-medium text-white px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">New Campaign</Link>
              <button onClick={handleLogout}   className="text-sm font-medium text-white/80 px-4 py-1.5 rounded-full hover:bg-white/10 transition-colors">Log Out</button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-navy-700" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-700 px-6 pb-5 pt-2 space-y-1">
          {!role ? (
            <>
              <Link to="/"          className="block text-sm font-medium text-white py-2" onClick={() => setOpen(false)}>Home</Link>
              <a href="/#how-it-works" className="block text-sm font-medium text-white py-2" onClick={() => setOpen(false)}>How it works</a>
              <Link to="/signup"    className="block text-sm font-medium text-white py-2" onClick={() => setOpen(false)}>Signup</Link>
              <Link to="/contact"   className="block text-sm font-medium text-white py-2" onClick={() => setOpen(false)}>Contact</Link>
            </>
          ) : (
            <>
              <Link to={role === 'user' ? '/dashboard' : '/brand/dashboard'} className="block text-sm font-medium text-white py-2" onClick={() => setOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="block text-sm font-medium text-white/70 py-2">Log Out</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
