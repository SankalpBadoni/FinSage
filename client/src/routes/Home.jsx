import { motion } from 'framer-motion';
import { ArrowRightIcon, ChartBarIcon, BanknotesIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Smart Budget Tracking',
    description: 'Easily track your monthly expenses and get insights on your spending patterns.',
    icon: <ChartBarIcon className="w-6 h-6" />,
    color: 'from-blue-400 to-blue-600',
  },
  {
    title: 'Savings Calculator',
    description: 'Discover potential savings and learn how to optimize your monthly budget.',
    icon: <BanknotesIcon className="w-6 h-6" />,
    color: 'from-purple-400 to-purple-600',
  },
  {
    title: 'Investment Recommendations',
    description: 'Get personalized investment advice based on your savings and goals.',
    icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
    color: 'from-green-400 to-green-600',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
              Smart Finance for a{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Better Future
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Take control of your finances with FinSmart. Track expenses, find savings opportunities,
              and get personalized investment recommendations.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/budget"
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
              >
                <span>Start Saving Now</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-3 text-gray-600 bg-white shadow-md rounded-full hover:shadow-lg transition-shadow"
              >
                View Demo
              </Link>
            </div>
          </motion.div>

          {/* Features Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How FinSmart Works
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Three simple steps to take control of your financial future
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Enter Your Budget',
                description: 'Input your monthly expenses across different categories.',
              },
              {
                step: '02',
                title: 'Get Insights',
                description: 'Receive personalized analysis and saving opportunities.',
              },
              {
                step: '03',
                title: 'Start Investing',
                description: 'Choose from recommended investment options for your savings.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-5xl font-bold text-indigo-100 absolute -top-8 -left-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
