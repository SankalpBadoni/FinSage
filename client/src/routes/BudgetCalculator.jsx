import { useBudget } from '../context/BudgetContext';
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addMonthlyData, getBudgetByMonth } = useBudget();

  // Load existing budget data when selected month changes
  useEffect(() => {
    const loadBudgetData = async () => {
      setIsLoading(true);
      const monthKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`;
      const budgetData = await getBudgetByMonth(monthKey);
      
      if (budgetData && budgetData.expenses) {
        setExpenses(budgetData.expenses);
        setShowAnalysis(true);
      } else {
        setExpenses({});
        setShowAnalysis(false);
      }
      setIsLoading(false);
    };

    loadBudgetData();
  }, [selectedDate, getBudgetByMonth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Ensure all numeric values are properly set
    const formattedExpenses = {};
    categories.forEach(category => {
      formattedExpenses[category.name] = parseFloat(expenses[category.name]) || 0;
    });

    await addMonthlyData(formattedExpenses, selectedDate);
    setShowAnalysis(true);
    setIsLoading(false);
  };

  // Month selection helpers
  const monthYear = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const handleMonthChange = (change) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + change);
    setSelectedDate(newDate);
  };

  // Calculate all budget values
  const calculations = {
    income: expenses['Monthly Income'] || 0,
    essential: categories
      .filter(cat => cat.type === 'essential')
      .reduce((sum, cat) => sum + (parseFloat(expenses[cat.name]) || 0), 0),
    lifestyle: categories
      .filter(cat => cat.type === 'lifestyle')
      .reduce((sum, cat) => sum + (parseFloat(expenses[cat.name]) || 0), 0),
    investment: categories
      .filter(cat => cat.type === 'investment')
      .reduce((sum, cat) => sum + (parseFloat(expenses[cat.name]) || 0), 0),
    debt: categories
      .filter(cat => cat.type === 'debt')
      .reduce((sum, cat) => sum + (parseFloat(expenses[cat.name]) || 0), 0),
  };

  const totalExpenses = calculations.essential + calculations.lifestyle + calculations.investment + calculations.debt;
  const monthlySavings = calculations.income - totalExpenses;
  const yearlySavings = monthlySavings * 12;

  // Generate AI insights based on spending patterns
  const getInsights = () => {
    const insights = [];
    
    if (calculations.income > 0) {
      const savingsRate = (monthlySavings / calculations.income) * 100;
      if (savingsRate < 20) {
        insights.push("Consider the 50/30/20 rule: 50% needs, 30% wants, 20% savings");
      } else {
        insights.push("Great job saving! Consider investing your surplus");
      }
    }

    if (calculations.lifestyle > calculations.essential * 0.6) {
      insights.push("Your lifestyle expenses are high relative to essentials. Look for areas to cut back");
    }

    if (calculations.debt > calculations.income * 0.36) {
      insights.push("Your debt payments are above recommended levels. Consider debt consolidation");
    }

    return insights;
  };

  // Animation variants
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

  // Prepare chart data
  const pieChartData = [
    { name: 'Essential', value: calculations.essential, color: '#3B82F6' },
    { name: 'Lifestyle', value: calculations.lifestyle, color: '#EC4899' },
    { name: 'Investment', value: calculations.investment, color: '#6366F1' },
    { name: 'Debt', value: calculations.debt, color: '#F43F5E' },
    { name: 'Savings', value: monthlySavings > 0 ? monthlySavings : 0, color: '#10B981' },
  ].filter(item => item.value > 0);

  const barChartData = [
    { name: 'Income', amount: calculations.income, color: '#10B981' },
    { name: 'Expenses', amount: totalExpenses, color: '#F43F5E' },
    { name: 'Savings', amount: monthlySavings > 0 ? monthlySavings : 0, color: '#6366F1' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white pt-1">
      {/* Animated gradient overlay */}
      <motion.div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
          backgroundSize: "400% 400%"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-3 h-3 bg-indigo-400' : 
              i % 3 === 1 ? 'w-2 h-2 bg-purple-400' : 
              'w-1 h-1 bg-pink-400'
            } opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() > 0.5 ? -1 : 1) * (100 + Math.random() * 150), 0],
              x: [0, (Math.random() - 0.5) * 50, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Animated decorative elements */}
          <motion.div 
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-indigo-100 to-purple-100 rounded-full -mr-48 -mt-48 opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-purple-100 to-pink-100 rounded-full -ml-48 -mb-48 opacity-50"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [180, 0, 180],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="relative">
            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <SparklesIcon className="w-8 h-8 text-indigo-600" />
                </motion.div>
                <div>
                  <motion.h2 
                    className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Smart Budget Calculator
                  </motion.h2>
                  <motion.p 
                    className="text-gray-600 text-lg mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Plan your financial future with AI-powered insights
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                  onClick={() => handleMonthChange(-1)}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <span className="text-lg font-medium text-gray-700">{monthYear}</span>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                  onClick={() => handleMonthChange(1)}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {categories.map((category) => (
                  <motion.div
                    key={category.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <div className="relative group">
                      <motion.label 
                        className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div 
                          className={`p-1.5 rounded-lg bg-gradient-to-r ${category.color}`}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {category.icon}
                        </motion.div>
                        <span>{category.name}</span>
                      </motion.label>
                      <div className={`relative transition-all duration-300 ${
                        focusedInput === category.name ? 'scale-105' : 'scale-100'
                      }`}>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-lg">$</span>
                        </div>
                        <input
                          type="number"
                          className="block w-full pl-10 pr-12 py-3 text-lg border-2 border-gray-200 rounded-xl 
                            focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all
                            group-hover:border-indigo-300 group-hover:shadow-lg backdrop-blur-sm
                            bg-white/70"
                          placeholder={category.placeholder}
                          value={expenses[category.name] || ''}
                          onFocus={() => setFocusedInput(category.name)}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => {
                            const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                            setExpenses(prev => ({ ...prev, [category.name]: value }));
                          }}
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
                className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                  text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-all 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                  shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed
                  relative overflow-hidden group"
                disabled={isLoading || !expenses['Monthly Income']}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: [-500, 500] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative">
                  {isLoading ? 'Saving...' : expenses['Monthly Income'] ? 'Analyze Budget' : 'Enter Monthly Income'}
                </span>
              </motion.button>
            </form>

            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 space-y-12"
              >
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-lg relative overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <h3 className="text-emerald-800 font-semibold mb-2 relative">Monthly Savings</h3>
                    <p className="text-3xl font-bold text-emerald-600 relative group-hover:scale-110 transition-transform">
                      ${monthlySavings.toFixed(2)}
                    </p>
                    <p className="text-emerald-700 mt-1 relative">
                      {((monthlySavings / calculations.income) * 100).toFixed(1)}% of income
                    </p>
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg relative overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 3,
                        delay: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <h3 className="text-blue-800 font-semibold mb-2 relative">Yearly Savings Potential</h3>
                    <p className="text-3xl font-bold text-blue-600 relative group-hover:scale-110 transition-transform">
                      ${yearlySavings.toFixed(2)}
                    </p>
                    <p className="text-blue-700 mt-1 relative">If maintained for 12 months</p>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg relative overflow-hidden group"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 3,
                        delay: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <h3 className="text-purple-800 font-semibold mb-2 relative">Total Expenses</h3>
                    <p className="text-3xl font-bold text-purple-600 relative group-hover:scale-110 transition-transform">
                      ${totalExpenses.toFixed(2)}
                    </p>
                    <p className="text-purple-700 mt-1 relative">
                      {((totalExpenses / calculations.income) * 100).toFixed(1)}% of income
                    </p>
                  </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.08 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg"
                  >
                    <h3 className="text-gray-800 font-semibold mb-4">Expense Breakdown</h3>
                    <motion.div 
                      className="h-[300px]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
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
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.08 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg"
                  >
                    <h3 className="text-gray-800 font-semibold mb-4">Income vs Expenses</h3>
                    <motion.div 
                      className="h-[300px]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
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
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl border border-indigo-100 shadow-lg"
                >
                  <motion.h3 
                    className="text-lg font-semibold text-indigo-800 flex items-center mb-4"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <SparklesIcon className="w-5 h-5 mr-2" />
                    </motion.div>
                    AI Financial Insights
                  </motion.h3>
                  <motion.ul 
                    className="space-y-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {getInsights().map((insight, index) => (
                      <motion.li 
                        key={index}
                        variants={itemVariants}
                        className="flex items-start space-x-2 text-indigo-700"
                      >
                        <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{insight}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/dashboard')}
                    className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                      text-white font-semibold rounded-xl hover:opacity-90 transition-all relative overflow-hidden group"
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      animate={{
                        x: [-500, 500],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative">View Detailed Dashboard</span>
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
