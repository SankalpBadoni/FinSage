import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CurrencyDollarIcon, 
  SparklesIcon,
  HomeIcon,
  TruckIcon,
  ShoppingCartIcon,
  FilmIcon,
  HeartIcon,
  AcademicCapIcon,
  BanknotesIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const categories = [
  { 
    name: 'Monthly Income',
    placeholder: 'Your total monthly income',
    icon: <BanknotesIcon className="w-5 h-5 text-white" />,
    color: 'from-emerald-500 to-emerald-600',
    type: 'income'
  },
  { 
    name: 'Housing',
    placeholder: 'Rent/Mortgage, Utilities...',
    icon: <HomeIcon className="w-5 h-5 text-white" />,
    color: 'from-blue-500 to-blue-600',
    type: 'essential'
  },
  { 
    name: 'Transportation',
    placeholder: 'Car payment, Fuel, Public transit...',
    icon: <TruckIcon className="w-5 h-5 text-white" />,
    color: 'from-purple-500 to-purple-600',
    type: 'essential'
  },
  { 
    name: 'Food & Groceries',
    placeholder: 'Groceries, Basic meals...',
    icon: <ShoppingCartIcon className="w-5 h-5 text-white" />,
    color: 'from-green-500 to-green-600',
    type: 'essential'
  },
  { 
    name: 'Healthcare',
    placeholder: 'Insurance, Medications...',
    icon: <HeartIcon className="w-5 h-5 text-white" />,
    color: 'from-red-500 to-red-600',
    type: 'essential'
  },
  { 
    name: 'Entertainment',
    placeholder: 'Movies, Games, Hobbies...',
    icon: <FilmIcon className="w-5 h-5 text-white" />,
    color: 'from-pink-500 to-pink-600',
    type: 'lifestyle'
  },
  { 
    name: 'Dining Out',
    placeholder: 'Restaurants, Takeout...',
    icon: <CurrencyDollarIcon className="w-5 h-5 text-white" />,
    color: 'from-yellow-500 to-yellow-600',
    type: 'lifestyle'
  },
  { 
    name: 'Education',
    placeholder: 'Courses, Books, Training...',
    icon: <AcademicCapIcon className="w-5 h-5 text-white" />,
    color: 'from-indigo-500 to-indigo-600',
    type: 'investment'
  },
  { 
    name: 'Debt Payments',
    placeholder: 'Credit Cards, Loans...',
    icon: <CreditCardIcon className="w-5 h-5 text-white" />,
    color: 'from-rose-500 to-rose-600',
    type: 'debt'
  },
];

export default function BudgetCalculator() {
  const [expenses, setExpenses] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const navigate = useNavigate();

  // Calculate totals by category
  const calculations = {
    income: expenses['Monthly Income'] || 0,
    essential: categories
      .filter(cat => cat.type === 'essential')
      .reduce((sum, cat) => sum + (expenses[cat.name] || 0), 0),
    lifestyle: categories
      .filter(cat => cat.type === 'lifestyle')
      .reduce((sum, cat) => sum + (expenses[cat.name] || 0), 0),
    investment: categories
      .filter(cat => cat.type === 'investment')
      .reduce((sum, cat) => sum + (expenses[cat.name] || 0), 0),
    debt: categories
      .filter(cat => cat.type === 'debt')
      .reduce((sum, cat) => sum + (expenses[cat.name] || 0), 0),
  };

  // Calculate savings and percentages
  const totalExpenses = calculations.essential + calculations.lifestyle + calculations.investment + calculations.debt;
  const monthlySavings = calculations.income - totalExpenses;
  const yearlySavings = monthlySavings * 12;

  // Prepare chart data
  const pieChartData = [
    { name: 'Essential', value: calculations.essential, color: '#3B82F6' },
    { name: 'Lifestyle', value: calculations.lifestyle, color: '#EC4899' },
    { name: 'Investment', value: calculations.investment, color: '#6366F1' },
    { name: 'Debt', value: calculations.debt, color: '#F43F5E' },
    { name: 'Savings', value: monthlySavings > 0 ? monthlySavings : 0, color: '#10B981' },
  ];

  const barChartData = [
    { name: 'Income', amount: calculations.income, color: '#10B981' },
    { name: 'Expenses', amount: totalExpenses, color: '#F43F5E' },
    { name: 'Savings', amount: monthlySavings > 0 ? monthlySavings : 0, color: '#6366F1' },
  ];

  // Generate AI insights based on spending patterns
  const getInsights = () => {
    const insights = [];
    
    // Income-based insights
    if (calculations.income > 0) {
      const savingsRate = (monthlySavings / calculations.income) * 100;
      if (savingsRate < 20) {
        insights.push("Consider the 50/30/20 rule: 50% needs, 30% wants, 20% savings");
      } else {
        insights.push("Great job saving! Consider investing your surplus");
      }
    }

    // Lifestyle spending insights
    if (calculations.lifestyle > calculations.essential * 0.6) {
      insights.push("Your lifestyle expenses are high relative to essentials. Look for areas to cut back");
    }

    // Debt insights
    if (calculations.debt > calculations.income * 0.36) {
      insights.push("Your debt payments are above recommended levels. Consider debt consolidation");
    }

    return insights;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnalysis(true);
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                      <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
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
                className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!expenses['Monthly Income']}
              >
                {expenses['Monthly Income'] ? 'Analyze Budget' : 'Enter Monthly Income'}
              </motion.button>
            </form>

            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl">
                    <h3 className="text-emerald-800 font-semibold mb-2">Monthly Savings</h3>
                    <p className="text-3xl font-bold text-emerald-600">
                      ${monthlySavings.toFixed(2)}
                    </p>
                    <p className="text-emerald-700 mt-1">
                      {((monthlySavings / calculations.income) * 100).toFixed(1)}% of income
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                    <h3 className="text-blue-800 font-semibold mb-2">Yearly Savings Potential</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      ${yearlySavings.toFixed(2)}
                    </p>
                    <p className="text-blue-700 mt-1">If maintained for 12 months</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                    <h3 className="text-purple-800 font-semibold mb-2">Total Expenses</h3>
                    <p className="text-3xl font-bold text-purple-600">
                      ${totalExpenses.toFixed(2)}
                    </p>
                    <p className="text-purple-700 mt-1">
                      {((totalExpenses / calculations.income) * 100).toFixed(1)}% of income
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="text-gray-800 font-semibold mb-4">Expense Breakdown</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData.filter(d => d.value > 0)}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ name, value }) => `${name}: $${value.toFixed(0)}`}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h3 className="text-gray-800 font-semibold mb-4">Income vs Expenses</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                          <Bar dataKey="amount">
                            {barChartData.map((entry, index) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100"
                >
                  <h3 className="text-lg font-semibold text-indigo-800 flex items-center mb-4">
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    AI Financial Insights
                  </h3>
                  <ul className="space-y-3">
                    {getInsights().map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2 text-indigo-700">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/dashboard')}
                    className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-200"
                  >
                    View Detailed Dashboard
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

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
