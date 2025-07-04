import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { name: 'Budget Calculator', path: '/budget' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Investments', path: '/investments' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-emerald-400 to-blue-400 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                FinSage
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group"
                >
                  {item.name}
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left bottom-0" />
                </Link>
              ))}
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur opacity-25 group-hover:opacity-75 transition"></div>
                        <UserCircleIcon className="w-8 h-8 relative" />
                      </div>
                      <span>{user.name}</span>
                    </button>
                    
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-xl py-1 z-50 border border-white/10">
                        <div className="px-4 py-2 text-xs text-slate-400">{user.email}</div>
                        <div className="border-t border-white/10"></div>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur opacity-75 group-hover:opacity-100 transition"></div>
                    <button className="relative px-6 py-2 bg-slate-900 rounded-full text-sm font-medium text-white group-hover:text-white/90 transition-colors">
                      Get Started
                    </button>
                  </Link>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-slate-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-slate-400">
                    Signed in as {user.name}
                  </div>
                  <div className="border-t border-white/10"></div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-slate-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-slate-300 hover:text-white hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <div className="px-3 py-2">
                    <Link
                      to="/signup"
                      className="relative group inline-block w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur opacity-75 group-hover:opacity-100 transition"></div>
                      <button className="relative w-full px-6 py-2 bg-slate-900 rounded-full text-base font-medium text-white group-hover:text-white/90 transition-colors">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="h-16"></div>
    </>
  );
}
