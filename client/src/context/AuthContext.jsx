import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  // Check if user is logged in
  const checkUser = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/me', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data.data);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.data);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await fetch('http://localhost:4000/api/auth/logout', {
        credentials: 'include'
      });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
