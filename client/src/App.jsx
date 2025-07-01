import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BudgetProvider } from './context/BudgetContext';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Investments from './routes/Investments';
import BudgetCalculator from './routes/BudgetCalculator';
import Login from './routes/Login';
import SignUp from './routes/SignUp';

import './App.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

// Public Route Component (redirects to dashboard if already logged in)
function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/budget"
            element={
              <ProtectedRoute>
                <BudgetCalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/investments"
            element={
              <ProtectedRoute>
                <Investments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <BudgetProvider>
          <AppContent />
        </BudgetProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
