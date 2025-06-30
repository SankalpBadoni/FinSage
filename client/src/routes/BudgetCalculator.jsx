import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Housing', placeholder: 'Rent/Mortgage, Utilities...' },
  { name: 'Transportation', placeholder: 'Car payment, Fuel, Public transit...' },
  { name: 'Food', placeholder: 'Groceries, Dining out...' },
  { name: 'Entertainment', placeholder: 'Movies, Games, Hobbies...' },
  { name: 'Healthcare', placeholder: 'Insurance, Medications...' },
  { name: 'Shopping', placeholder: 'Clothes, Electronics...' },
];

export default function BudgetCalculator() {
  const [expenses, setExpenses] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the data and calculate savings
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Budget Calculator</h2>
          <p className="text-gray-600 mb-8">
            Enter your monthly expenses to get personalized savings recommendations
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    {category.name}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder={category.placeholder}
                      onChange={(e) =>
                        setExpenses({ ...expenses, [category.name]: parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Calculate Savings
            </motion.button>
          </form>

          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-sm font-medium text-indigo-800">Pro Tips:</h3>
            <ul className="mt-2 text-sm text-indigo-700 space-y-1">
              <li>• Include all regular monthly expenses for accurate recommendations</li>
              <li>• Consider average amounts for variable expenses</li>
              <li>• Don't forget about subscriptions and recurring bills</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
