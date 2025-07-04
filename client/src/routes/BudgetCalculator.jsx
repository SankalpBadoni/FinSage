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
  CreditCardIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
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
    income: Number(expenses['Monthly Income']) || 0,
    essential: categories
      .filter(cat => cat.type === 'essential')
      .reduce((sum, cat) => sum + (Number(expenses[cat.name]) || 0), 0),
    lifestyle: categories
      .filter(cat => cat.type === 'lifestyle')
      .reduce((sum, cat) => sum + (Number(expenses[cat.name]) || 0), 0),
    investment: categories
      .filter(cat => cat.type === 'investment')
      .reduce((sum, cat) => sum + (Number(expenses[cat.name]) || 0), 0),
    debt: categories
      .filter(cat => cat.type === 'debt')
      .reduce((sum, cat) => sum + (Number(expenses[cat.name]) || 0), 0),
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Month Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg border border-white/10 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 rounded-lg bg-black/20 text-white/80 hover:bg-black/30 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold text-white">{monthYear}</h2>
            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 rounded-lg bg-black/20 text-white/80 hover:bg-black/30 transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className={`backdrop-blur-xl bg-black/30 rounded-xl shadow-lg border border-white/10 overflow-hidden ${
                  focusedInput === category.name ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                <div className={`bg-gradient-to-r ${category.color} p-4`}>
                  <div className="flex items-center space-x-3">
                    {category.icon}
                    <span className="text-white font-medium">{category.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/60">$</span>
                    <input
                      type="number"
                      name={category.name}
                      value={expenses[category.name] || ''}
                      onChange={(e) => setExpenses({ ...expenses, [category.name]: e.target.value })}
                      placeholder={category.placeholder}
                      onFocus={() => setFocusedInput(category.name)}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full pl-8 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Budget'
              )}
            </motion.button>
          </div>
        </form>

        {/* Analysis Section */}
        {showAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-8"
          >
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg border border-white/10 p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6">Expense Breakdown</h3>
                <div className="h-80">
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
              </motion.div>

              {/* Bar Chart */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg border border-white/10 p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6">Income vs Expenses</h3>
                <div className="h-80">
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
              </motion.div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div className="backdrop-blur-xl bg-black/30 rounded-xl p-6 border border-white/10">
                <h4 className="text-white/60 text-sm font-medium">Monthly Income</h4>
                <p className="mt-2 text-2xl font-bold text-emerald-400">${calculations.income.toFixed(2)}</p>
              </motion.div>

              <motion.div className="backdrop-blur-xl bg-black/30 rounded-xl p-6 border border-white/10">
                <h4 className="text-white/60 text-sm font-medium">Total Expenses</h4>
                <p className="mt-2 text-2xl font-bold text-rose-400">${totalExpenses.toFixed(2)}</p>
              </motion.div>

              <motion.div className="backdrop-blur-xl bg-black/30 rounded-xl p-6 border border-white/10">
                <h4 className="text-white/60 text-sm font-medium">Monthly Savings</h4>
                <p className="mt-2 text-2xl font-bold text-emerald-400">${monthlySavings.toFixed(2)}</p>
              </motion.div>

              <motion.div className="backdrop-blur-xl bg-black/30 rounded-xl p-6 border border-white/10">
                <h4 className="text-white/60 text-sm font-medium">Yearly Savings</h4>
                <p className="mt-2 text-2xl font-bold text-emerald-400">${yearlySavings.toFixed(2)}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
