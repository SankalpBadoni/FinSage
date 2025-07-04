import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { 
  HomeIcon, 
  TruckIcon, 
  ShoppingBagIcon, 
  FilmIcon,
  HeartIcon,
  AcademicCapIcon,
  CreditCardIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useBudget } from '../context/BudgetContext';

const categories = [
  { name: 'Monthly Income', icon: <BanknotesIcon className="w-6 h-6" />, color: 'bg-emerald-500', dataKey: 'Monthly Income' },
  { name: 'Housing', icon: <HomeIcon className="w-6 h-6" />, color: 'bg-blue-500', dataKey: 'Housing' },
  { name: 'Transportation', icon: <TruckIcon className="w-6 h-6" />, color: 'bg-purple-500', dataKey: 'Transportation' },
  { name: 'Food & Groceries', icon: <ShoppingBagIcon className="w-6 h-6" />, color: 'bg-green-500', dataKey: 'Food & Groceries' },
  { name: 'Healthcare', icon: <HeartIcon className="w-6 h-6" />, color: 'bg-red-500', dataKey: 'Healthcare' },
  { name: 'Entertainment', icon: <FilmIcon className="w-6 h-6" />, color: 'bg-pink-500', dataKey: 'Entertainment' },
  { name: 'Education', icon: <AcademicCapIcon className="w-6 h-6" />, color: 'bg-indigo-500', dataKey: 'Education' },
  { name: 'Debt Payments', icon: <CreditCardIcon className="w-6 h-6" />, color: 'bg-rose-500', dataKey: 'Debt Payments' },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getChartData, getCurrentMonth } = useBudget();
  
  const chartData = useMemo(() => getChartData(), [getChartData]);
  const currentMonth = useMemo(() => getCurrentMonth(), [getCurrentMonth]);

  // Calculate total expenses and savings
  const totalExpenses = useMemo(() => {
    if (!currentMonth) return 0;
    return categories
      .filter(cat => cat.name !== 'Monthly Income')
      .reduce((sum, cat) => sum + (currentMonth[cat.dataKey] || 0), 0);
  }, [currentMonth]);

  const savings = useMemo(() => {
    if (!currentMonth || !currentMonth['Monthly Income']) return 0;
    return currentMonth['Monthly Income'] - totalExpenses;
  }, [currentMonth, totalExpenses]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg border border-white/10 p-8"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl"
              >
                <ArrowTrendingUpIcon className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Financial Dashboard
                </h1>
                <p className="mt-2 text-white/80 text-lg">Track your spending, save more, and invest wisely</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-xl bg-black/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-white/10"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`${category.color} p-3 rounded-lg text-white`}>
                      {category.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/60">{category.name}</p>
                      <p className="text-2xl font-bold text-white">
                        ${(currentMonth[category.dataKey] || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  {currentMonth['Monthly Income'] && category.name !== 'Monthly Income' && (
                    <div className="mt-auto">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-white/60">
                            of income
                          </span>
                          <span className="text-sm font-medium text-white">
                            {((currentMonth[category.dataKey] || 0) / currentMonth['Monthly Income'] * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="overflow-hidden h-1.5 text-xs flex rounded-full bg-gray-700">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${((currentMonth[category.dataKey] || 0) / currentMonth['Monthly Income'] * 100)}%` 
                            }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`${category.color} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {category.name === 'Monthly Income' && (
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-white/60">Savings Potential</span>
                      <span className="text-lg font-semibold text-emerald-400">
                        ${savings.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Spending Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Area Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <h2 className="text-xl font-semibold mb-6 text-white">Monthly Spending Trends</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      {categories.filter(cat => cat.name !== 'Monthly Income').map((cat, index) => (
                        <linearGradient key={cat.dataKey} id={`color${cat.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={cat.color.replace('bg-', '#').replace('500', '300')} stopOpacity={0.6}/>
                          <stop offset="95%" stopColor={cat.color.replace('bg-', '#').replace('500', '300')} stopOpacity={0.1}/>
                          <animate attributeName="stopOpacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" opacity={0.4} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: '#D1D5DB', fontSize: 12 }}
                      axisLine={{ stroke: '#6B7280' }}
                      tickLine={{ stroke: '#6B7280' }}
                    />
                    <YAxis
                      tick={{ fill: '#D1D5DB', fontSize: 12 }}
                      axisLine={{ stroke: '#6B7280' }}
                      tickLine={{ stroke: '#6B7280' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value) => `$${value.toFixed(2)}`}
                      labelStyle={{ color: '#F3F4F6', fontWeight: 'bold' }}
                      contentStyle={{
                        backgroundColor: 'rgba(17, 24, 39, 0.95)',
                        border: '1px solid rgba(75, 85, 99, 0.5)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                        padding: '12px',
                        color: '#F3F4F6'
                      }}
                      cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '3 3' }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: '20px'
                      }}
                      formatter={(value) => (
                        <span style={{ color: '#F3F4F6', fontWeight: 500 }}>{value}</span>
                      )}
                    />
                    {categories.filter(cat => cat.name !== 'Monthly Income').map((cat) => (
                      <Area
                        key={cat.dataKey}
                        type="monotone"
                        dataKey={cat.dataKey}
                        name={cat.name}
                        stroke={cat.color.replace('bg-', '#').replace('500', '300')}
                        strokeWidth={2.5}
                        fill={`url(#color${cat.dataKey})`}
                        fillOpacity={1}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Income vs Expenses Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <h2 className="text-xl font-semibold mb-6 text-white">Income vs Expenses</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.3}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#E5E7EB', fontSize: 12 }}
                      axisLine={{ stroke: '#4B5563' }}
                      tickLine={{ stroke: '#4B5563' }}
                    />
                    <YAxis 
                      tick={{ fill: '#E5E7EB', fontSize: 12 }}
                      axisLine={{ stroke: '#4B5563' }}
                      tickLine={{ stroke: '#4B5563' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => `$${value.toFixed(2)}`}
                      labelStyle={{ color: '#E5E7EB', fontWeight: 'bold' }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                        padding: '12px',
                        color: '#E5E7EB'
                      }}
                      cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: '20px'
                      }}
                      formatter={(value) => (
                        <span style={{ color: '#E5E7EB', fontWeight: 500 }}>{value}</span>
                      )}
                    />
                    <Bar 
                      dataKey="Monthly Income" 
                      name="Income" 
                      fill="url(#colorIncome)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="totalExpenses" 
                      name="Total Expenses" 
                      fill="url(#colorExpenses)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
