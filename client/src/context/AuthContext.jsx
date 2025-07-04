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
      console.log('Checking user auth status...');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      console.log('Auth check response:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Auth check data:', data);
        if (data.success && data.data) {
          setUser(data.data);
        }
      } else {
        const errorData = await response.json();
        console.log('Auth check error:', errorData);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Register response:', data);

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
  const login = async (formData) => {
    try {
      console.log('Attempting login...');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      

      if (response.ok && data.success) {
        // Wait for user data to be fetched
        await checkUser();
        navigate('/dashboard');
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
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

export const useAuth = () => useContext(AuthContext);
