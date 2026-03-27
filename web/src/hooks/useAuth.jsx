import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');
    if (token && savedRole) {
      setRole(savedRole);
      fetchProfile(savedRole);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async (r) => {
    try {
      if (r === 'user') {
        const { data } = await api.get('/users/me');
        setUser(data);
      }
      // brands can fetch their own profile endpoint if needed
      setRole(r);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData, userRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userRole);
    setUser(userData);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
