import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRightIcon, ChartBarIcon, BanknotesIcon, ArrowTrendingUpIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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

const stats = [
  { label: 'Total Budget', amount: '$5,240', color: 'bg-green-100 text-green-600' },
  { label: 'Spent', amount: '$3,800', color: 'bg-red-100 text-red-600' },
  { label: 'Remaining', amount: '$1,440', color: 'bg-blue-100 text-blue-600' },
];

function AnimatedCard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Increased sensitivity by reducing the range from [-300, 300] to [-150, 150]
  // and increased rotation range from [-15, 15] to [-25, 25]
  const rotateX = useTransform(mouseY, [-150, 150], [25, -25]);
  const rotateY = useTransform(mouseX, [-150, 150], [-25, 25]);

  // Increased animation speed by adjusting spring config
  const springConfig = { damping: 15, stiffness: 300 }; // More responsive spring
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    });
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative perspective-1000"
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 transform-gpu preserve-3d hover:shadow-3xl transition-shadow">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Your Budget</h3>
            <p className="text-sm text-gray-500">Monthly Overview</p>
          </div>
          <div className="bg-indigo-100 p-2 rounded-lg">
            <ChartPieIcon className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        {/* Animated Stats */}
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
            >
              <span className="text-gray-600">{stat.label}</span>
              <span className={"font-semibold px-3 py-1 rounded-full " + stat.color}>
                {stat.amount}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Monthly Progress</span>
            <span className="text-gray-900 font-medium">72%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Floating Elements for 3D effect */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg opacity-20 transform rotate-12 -z-10" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-lg opacity-20 transform -rotate-12 -z-10" />
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"> {/* Reduced gap from gap-12 to gap-4 */}
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left"
            >
              <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
                Smart Finance for a{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Better Future
                </span>
              </h1>
              <p className="mt-3 text-xl text-gray-600 leading-snug"> {/* Reduced margin-top and added tighter line height */}
                Take control of your finances with FinSmart. Track expenses, find savings opportunities,
                and get personalized investment recommendations.
              </p>
              <div className="mt-10 flex gap-4">
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

            {/* Right side - Animated Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:flex justify-end lg:-mt-8" /* Added negative margin to pull card up */
            >
              <AnimatedCard />
            </motion.div>
          </div>

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
                <div className={"bg-gradient-to-r " + feature.color + " w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6"}>
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
