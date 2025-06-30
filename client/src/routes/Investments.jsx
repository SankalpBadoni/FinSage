import { motion } from 'framer-motion';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const investmentOptions = [
  {
    title: 'Stock Market Index Funds',
    description: 'Low-cost, diversified investment tracking major market indices.',
    risk: 'Moderate',
    expectedReturn: '8-10%',
    icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
    color: 'bg-blue-500',
  },
  {
    title: 'High-Yield Savings',
    description: 'Safe option with guaranteed returns through bank deposits.',
    risk: 'Low',
    expectedReturn: '3-4%',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    color: 'bg-green-500',
  },
  {
    title: 'Government Bonds',
    description: 'Government-backed securities with fixed interest rates.',
    risk: 'Very Low',
    expectedReturn: '2-5%',
    icon: <CurrencyDollarIcon className="w-6 h-6" />,
    color: 'bg-yellow-500',
  },
];

export default function Investments() {
  const savedAmount = 5000; // This would come from your actual savings calculation

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Investment Recommendations</h1>
          <p className="mt-2 text-gray-600">
            Based on your savings of <span className="font-semibold text-green-600">${savedAmount}</span>,
            here are some investment options to consider
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investmentOptions.map((option, index) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`${option.color} bg-opacity-10 p-6`}>
                <div className="flex items-center space-x-4">
                  <div className={`${option.color} p-3 rounded-lg`}>
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-600">Expected Return: {option.expectedReturn}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{option.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Risk Level:</span>
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${option.risk === 'Low' ? 'bg-green-100 text-green-800' : 
                      option.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}
                  `}>
                    {option.risk}
                  </span>
                </div>
                <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Smart Investment Tips</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
              <p className="ml-3 text-gray-600">Diversify your portfolio across different asset classes</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
              <p className="ml-3 text-gray-600">Start with low-risk investments if you're new to investing</p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
              <p className="ml-3 text-gray-600">Consider consulting with a financial advisor for personalized advice</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
