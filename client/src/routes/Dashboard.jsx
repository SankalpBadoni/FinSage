import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  HomeIcon, 
  TruckIcon, 
  ShoppingBagIcon, 
  FilmIcon,
  HeartIcon,
  AcademicCapIcon,
  CreditCardIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import { useBudget } from '../context/BudgetContext';

const categories = [
  { name: 'Housing', icon: <HomeIcon className="w-6 h-6" />, color: 'bg-blue-500', dataKey: 'housing' },
  { name: 'Transportation', icon: <TruckIcon className="w-6 h-6" />, color: 'bg-green-500', dataKey: 'transportation' },
  { name: 'Food & Groceries', icon: <ShoppingBagIcon className="w-6 h-6" />, color: 'bg-yellow-500', dataKey: 'food' },
  { name: 'Healthcare', icon: <HeartIcon className="w-6 h-6" />, color: 'bg-red-500', dataKey: 'healthcare' },
  { name: 'Entertainment', icon: <FilmIcon className="w-6 h-6" />, color: 'bg-purple-500', dataKey: 'entertainment' },
  { name: 'Education', icon: <AcademicCapIcon className="w-6 h-6" />, color: 'bg-indigo-500', dataKey: 'education' },
  { name: 'Debt Payments', icon: <CreditCardIcon className="w-6 h-6" />, color: 'bg-rose-500', dataKey: 'debt' },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getChartData, getCurrentMonth } = useBudget();
  
  const chartData = useMemo(() => getChartData(), [getChartData]);
  const currentMonth = useMemo(() => getCurrentMonth(), [getCurrentMonth]);

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
                  <div className={category.color + " p-3 rounded-lg text-white"}>
                    {category.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{category.name}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${(currentMonth[category.name] || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                {currentMonth['Monthly Income'] && (
                  <p className="mt-2 text-sm text-gray-500">
                    {((currentMonth[category.name] || 0) / currentMonth['Monthly Income'] * 100).toFixed(1)}% of income
                  </p>
                )}
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
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    {categories.map((cat, index) => (
                      <linearGradient key={cat.dataKey} id={`color${cat.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={cat.color.replace('bg-', '#').replace('500', '400')} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={cat.color.replace('bg-', '#').replace('500', '400')} stopOpacity={0}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `$${value.toFixed(2)}`}
                    labelStyle={{ color: '#111827' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  {categories.map((cat) => (
                    <Area
                      key={cat.dataKey}
                      type="monotone"
                      dataKey={cat.dataKey}
                      name={cat.name}
                      stroke={cat.color.replace('bg-', '#').replace('500', '400')}
                      fill={`url(#color${cat.dataKey})`}
                      fillOpacity={1}
                      stackId="1"
                    />
                  ))}
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
