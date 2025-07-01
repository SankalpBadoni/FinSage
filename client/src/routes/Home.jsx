import { motion, useMotionValue, useTransform, useSpring, useScroll, useInView } from 'framer-motion';
import { 
  ArrowRightIcon, 
  ChartBarIcon, 
  BanknotesIcon, 
  ArrowTrendingUpIcon, 
  ChartPieIcon,
  SparklesIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const features = [
  {
    title: 'AI-Powered Insights',
    description: 'Advanced algorithms analyze your spending patterns to provide personalized financial recommendations.',
    icon: <SparklesIcon className="w-6 h-6" />,
    color: 'from-violet-400 to-violet-600',
    direction: 'left'
  },
  {
    title: 'Smart Budget Tracking',
    description: 'Real-time expense tracking with automatic categorization and trend analysis.',
    icon: <ChartBarIcon className="w-6 h-6" />,
    color: 'from-blue-400 to-blue-600',
    direction: 'right'
  },
  {
    title: 'Intelligent Savings',
    description: 'Dynamic savings goals with AI-driven strategies to help you save more effectively.',
    icon: <BanknotesIcon className="w-6 h-6" />,
    color: 'from-purple-400 to-purple-600',
    direction: 'left'
  },
  {
    title: 'Investment Portfolio',
    description: 'Personalized investment recommendations based on your risk profile and goals.',
    icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
    color: 'from-green-400 to-green-600',
    direction: 'right'
  },
  {
    title: 'Secure Transactions',
    description: 'Bank-grade encryption and security protocols to protect your financial data.',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    color: 'from-pink-400 to-pink-600',
    direction: 'left'
  },
  {
    title: 'Community Insights',
    description: 'Learn from a community of successful investors and financial experts.',
    icon: <UserGroupIcon className="w-6 h-6" />,
    color: 'from-yellow-400 to-yellow-600',
    direction: 'right'
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Small Business Owner',
    content: 'FinSmart helped me save 30% more each month while growing my business investment portfolio.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Tech Professional',
    content: 'The AI insights are like having a personal financial advisor. Incredibly powerful yet easy to use.',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Freelancer',
    content: 'Finally, an app that understands variable income! The savings recommendations are spot-on.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const stats = [
  { 
    label: 'Active Users',
    value: '50K+',
    description: 'Trust FinSmart for their finances',
    color: 'from-blue-400 to-blue-600'
  },
  { 
    label: 'Total Savings',
    value: '$2.5M+',
    description: 'Saved by our users this year',
    color: 'from-green-400 to-green-600'
  },
  { 
    label: 'ROI Average',
    value: '32%',
    description: 'Annual return on investments',
    color: 'from-purple-400 to-purple-600'
  },
  { 
    label: 'AI Insights',
    value: '24/7',
    description: 'Continuous financial monitoring',
    color: 'from-pink-400 to-pink-600'
  },
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
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Text animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative pt-20 pb-12 overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
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

        {/* Decorative background elements with enhanced animations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full mix-blend-multiply opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-200 to-indigo-200 rounded-full mix-blend-multiply opacity-50"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [180, 0, 180],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-bl from-purple-200 to-blue-200 rounded-full mix-blend-multiply opacity-40"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, 0],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(155)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0 ? 'w-3 h-3 bg-indigo-400' : 
                i % 3 === 1 ? 'w-2 h-2 bg-purple-400' : 
                'w-1 h-1 bg-blue-400'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, (Math.random() > 0.5 ? -1 : 1) * (100 + Math.random() * 150), 0],
                x: [0, (Math.random() - 0.5) * 50, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 7 + Math.random() * 7,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
            {/* Left side - Text content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -100 }}
              animate={isHeroInView ? { 
                opacity: 1, 
                x: 0,
              } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left pt-8"
            >
              <motion.h1 
                className="text-5xl font-extrabold text-gray-900 sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Smart Finance for a{' '}
                </motion.span>
                <motion.span 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent inline-block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  Better Future
                </motion.span>
              </motion.h1>
              <motion.p 
                className="mt-2 text-xl text-gray-600 leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Take control of your finances with FinSmart. Track expenses, find savings opportunities,
                and get personalized investment recommendations.
              </motion.p>
              <motion.div 
                className="mt-6 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Link
                  to="/budget"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-flex items-center space-x-2"
                >
                  <span>Start Saving Now</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
                {/* <Link
                  to="/dashboard"
                  className="px-8 py-3 text-gray-600 bg-white shadow-md rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50"
                >
                  View Demo
                </Link> */}
              </motion.div>
            </motion.div>

            {/* Right side - Animated Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:flex justify-end" 
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <AnimatedCard />
              </motion.div>
            </motion.div>
          </div>

          {/* Features Section */}
          <div className="relative mt-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-block mb-4 p-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl"
              >
                <SparklesIcon className="w-6 h-6 text-indigo-600" />
              </motion.div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Powerful Features
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to take control of your financial future
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: feature.direction === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 transform skew-y-3" />
            <div className="relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`inline-block p-4 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg mb-4`}>
                        <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{stat.label}</p>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 mb-20"
          >
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-block mb-4 p-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl"
              >
                <UserGroupIcon className="w-6 h-6 text-indigo-600" />
              </motion.div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                What Our Users Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied users who have transformed their financial lives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-8 relative"
                >
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-50" />
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mb-4 border-2 border-indigo-100"
                    />
                    <p className="text-gray-600 italic mb-4">{testimonial.content}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
