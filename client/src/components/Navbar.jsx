import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">F</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              FinSmart
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/budget" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Budget Calculator
            </Link>
            <Link to="/investments" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Investment Plans
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
