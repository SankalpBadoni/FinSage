import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-b from-indigo-100 to-purple-100 rounded-full -mr-20 -mt-20 opacity-50" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-t from-indigo-100 to-purple-100 rounded-full -ml-20 -mb-20 opacity-50" />

          <div className="relative">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Join FinSmart to start your financial journey
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                {!isLoading && <ArrowRightIcon className="w-5 h-5" />}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
