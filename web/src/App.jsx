import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import BrandDashboard from './pages/BrandDashboard';
import NewCampaign from './pages/NewCampaign';
import CampaignDetail from './pages/CampaignDetail';
import Contact from './pages/Contact';
import ProfileQuestionnaire from './pages/ProfileQuestionnaire';
import Blogs from './pages/Blogs';
import News from './pages/News';

function ProtectedRoute({ children, requiredRole }) {
  const { role, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!role) return <Navigate to="/login" />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  const { role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={role ? <Navigate to={role === 'user' ? '/dashboard' : '/brand/dashboard'} /> : <Landing />} />
      <Route path="/login" element={role ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={role ? <Navigate to="/" /> : <Signup />} />

      <Route path="/dashboard" element={<ProtectedRoute requiredRole="user"><UserDashboard /></ProtectedRoute>} />
      <Route path="/brand/dashboard" element={<ProtectedRoute requiredRole="brand"><BrandDashboard /></ProtectedRoute>} />
      <Route path="/brand/campaigns/new" element={<ProtectedRoute requiredRole="brand"><NewCampaign /></ProtectedRoute>} />
      <Route path="/brand/campaigns/:id" element={<ProtectedRoute requiredRole="brand"><CampaignDetail /></ProtectedRoute>} />

      <Route path="/questionnaire" element={<ProtectedRoute requiredRole="user"><ProfileQuestionnaire /></ProtectedRoute>} />
      <Route path="/questionnaire/:branch" element={<ProtectedRoute requiredRole="user"><ProfileQuestionnaire /></ProtectedRoute>} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/blogs"   element={<Blogs />} />
      <Route path="/news"    element={<News />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
