import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/outline';

const categories = [
  { 
    name: 'Housing',
    placeholder: 'Rent/Mortgage, Utilities...',
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    color: 'from-blue-500 to-blue-600'
  },
  { 
    name: 'Transportation',
    placeholder: 'Car payment, Fuel, Public transit...',
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    color: 'from-purple-500 to-purple-600'
  },
  { 
    name: 'Food',
    placeholder: 'Groceries, Dining out...',
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    color: 'from-green-500 to-green-600'
  },
  { 
    name: 'Entertainment',
    placeholder: 'Movies, Games, Hobbies...',
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    color: 'from-pink-500 to-pink-600'
  },
  { 
    name: 'Healthcare',
    placeholder: 'Insurance, Medications...',
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    color: 'from-red-500 to-red-600'
  },
  { 
    name: 'Shopping',
    placeholder: 'Clothes, Electronics...',
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    color: 'from-yellow-500 to-yellow-600'
  },
];

export default function BudgetCalculator() {
  const [expenses, setExpenses] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the data and calculate savings
    navigate('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-indigo-100 to-purple-100 rounded-full -mr-32 -mt-32 opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-t from-indigo-100 to-purple-100 rounded-full -ml-32 -mb-32 opacity-50" />

          <div className="relative">
            <div className="flex items-center space-x-4 mb-6">
              <SparklesIcon className="w-8 h-8 text-indigo-600" />
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Budget Calculator
                </h2>
                <p className="text-gray-600 text-lg mt-2">
                  Enter your monthly expenses to get personalized savings recommendations
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                        <div className={"p-1.5 rounded-lg bg-gradient-to-r " + category.color}>
                          {category.icon}
                        </div>
                        <span>{category.name}</span>
                      </label>
                      <div className={`relative transition-all duration-300 ${
                        focusedInput === category.name ? 'scale-105' : 'scale-100'
                      }`}>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-lg">$</span>
                        </div>
                        <input
                          type="number"
                          className="block w-full pl-10 pr-12 py-3 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          placeholder={category.placeholder}
                          onFocus={() => setFocusedInput(category.name)}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) =>
                            setExpenses({ ...expenses, [category.name]: parseFloat(e.target.value) || 0 })
                          }
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                          /mo
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-200"
              >
                Calculate Savings
              </motion.button>
            </form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
            >
              <h3 className="text-lg font-semibold text-indigo-800 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2" />
                Pro Tips
              </h3>
              <ul className="mt-3 text-sm text-indigo-700 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2" />
                  Include all regular monthly expenses for accurate recommendations
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2" />
                  Consider average amounts for variable expenses
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2" />
                  Don't forget about subscriptions and recurring bills
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
