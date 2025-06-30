import { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HomeIcon, TruckIcon, ShoppingBagIcon, FilmIcon } from '@heroicons/react/24/outline';

const sampleData = [
  { month: 'Jan', spending: 4000 },
  { month: 'Feb', spending: 3000 },
  { month: 'Mar', spending: 2000 },
  { month: 'Apr', spending: 2780 },
  { month: 'May', spending: 1890 },
  { month: 'Jun', spending: 2390 },
];

const categories = [
  { name: 'Housing', icon: <HomeIcon className="w-6 h-6" />, color: 'bg-blue-500' },
  { name: 'Transportation', icon: <TruckIcon className="w-6 h-6" />, color: 'bg-green-500' },
  { name: 'Food', icon: <ShoppingBagIcon className="w-6 h-6" />, color: 'bg-yellow-500' },
  { name: 'Entertainment', icon: <FilmIcon className="w-6 h-6" />, color: 'bg-purple-500' },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your spending, save more, and invest wisely</p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.02 }}
                className={category.color + " bg-opacity-10 p-6 rounded-xl shadow-sm cursor-pointer transition-all"}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex items-center space-x-4">
                  <div className={category.color + " p-3 rounded-lg"}>
                    {category.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{category.name}</p>
                    <p className="text-2xl font-bold text-gray-900">$2,500</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spending Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Spending Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sampleData}>
                  <defs>
                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="spending"
                    stroke="#6366F1"
                    fillOpacity={1}
                    fill="url(#colorSpending)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Add Budget Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Add Monthly Budget</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="space-y-2">
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
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
              Save Budget
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
