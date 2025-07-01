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

function FloatingCard({ delay = 0, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 1.2, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -10, 
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`transform-gpu perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [25, -25]);
  const rotateY = useTransform(mouseX, [-150, 150], [-25, 25]);

  const springConfig = { damping: 15, stiffness: 300 };
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
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform-gpu preserve-3d hover:shadow-3xl transition-all duration-500 border border-white/20">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Your Portfolio</h3>
            <p className="text-sm text-gray-500">Live Performance</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-lg">
            <ChartPieIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Animated Stats */}
        <div className="space-y-4">
          {[
            { label: 'Total Balance', amount: '$24,580', color: 'from-green-500 to-emerald-600' },
            { label: 'Monthly Savings', amount: '$1,240', color: 'from-blue-500 to-cyan-600' },
            { label: 'Investments', amount: '$12,340', color: 'from-purple-500 to-pink-600' },
            { label: 'Growth Rate', amount: '+18.5%', color: 'from-orange-500 to-red-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <span className="text-gray-600 font-medium">{stat.label}</span>
              <span className={`font-bold px-4 py-2 rounded-xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}>
                {stat.amount}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-600 font-medium">Goal Progress</span>
            <span className="text-gray-900 font-bold">87%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: '87%' }}
              transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
            />
          </div>
        </div>

        {/* Floating Elements for 3D effect */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-indigo-400/30 rounded-full blur-xl transform rotate-12 -z-10" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-indigo-400/30 to-purple-400/30 rounded-full blur-xl transform -rotate-12 -z-10" />
      </div>
    </motion.div>
  );
}

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Mesh Gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
          backgroundSize: "400% 400%"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      
      {/* Dynamic geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-r ${
            i % 4 === 0 ? 'from-white/20 to-white/10' :
            i % 4 === 1 ? 'from-blue-400/20 to-purple-400/10' :
            i % 4 === 2 ? 'from-purple-400/20 to-pink-400/10' :
            'from-pink-400/20 to-indigo-400/10'
          } backdrop-blur-sm`}
          style={{
            width: `${150 + Math.random() * 200}px`,
            height: `${150 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
      
      {/* Floating particles */}
      {[...Array(200)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            i % 3 === 0 ? 'w-2 h-2 bg-white/60' : 
            i % 3 === 1 ? 'w-1 h-1 bg-blue-300/80' : 
            'w-3 h-3 bg-purple-300/60'
          } shadow-lg`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100 - Math.random() * 200, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
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
      {/* COMPLETELY REDESIGNED HERO SECTION */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Revolutionary Background */}
        <HeroBackground />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            
            {/* Left Column - Enhanced Text Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -100 }}
              animate={isHeroInView ? { 
                opacity: 1, 
                x: 0,
              } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-left space-y-8"
            >
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/30 shadow-lg"
              >
                <SparklesIcon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">AI-Powered Financial Intelligence</span>
              </motion.div>

              {/* Main Headline with Advanced Typography */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="space-y-4"
              >
                <h1 className="text-7xl lg:text-8xl font-black leading-none">
                  <motion.span
                    className="block text-white drop-shadow-2xl"
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Smart
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-2xl"
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Finance
                  </motion.span>
                  <motion.span
                    className="block text-white drop-shadow-2xl"
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    Revolution
                  </motion.span>
                </h1>
              </motion.div>

              {/* Enhanced Description */}
              <motion.p 
                className="text-2xl text-white/90 leading-relaxed max-w-xl backdrop-blur-sm bg-white/10 rounded-2xl p-6 shadow-xl border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Transform your financial future with cutting-edge AI technology. 
                <span className="font-semibold text-yellow-300"> Track, save, invest, and grow</span> like never before.
              </motion.p>

              {/* Advanced CTA Section */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 pt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/budget"
                    className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl transition-all duration-300 inline-flex items-center space-x-3"
                  >
                    <span className="relative z-10">Start Your Journey</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRightIcon className="w-6 h-6 relative z-10" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="px-10 py-5 bg-white/20 backdrop-blur-xl text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300 shadow-xl">
                    Watch Demo
                  </button>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="flex items-center space-x-8 pt-8"
              >
                <div className="text-white/80">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm opacity-80">Happy Users</div>
                </div>
                <div className="text-white/80">
                  <div className="text-3xl font-bold">$2.5M+</div>
                  <div className="text-sm opacity-80">Money Saved</div>
                </div>
                <div className="text-white/80">
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-sm opacity-80">Uptime</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Multiple Floating Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="relative h-full flex items-center justify-center"
            >
              {/* Main Card */}
              <div className="relative z-20">
                <AnimatedCard />
              </div>

              {/* Floating Secondary Cards */}
              <FloatingCard delay={1.5} className="absolute -top-10 -left-10 z-10">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 w-48">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <ArrowTrendingUpIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">Monthly Growth</div>
                      <div className="text-xs text-gray-600">+24.5%</div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 2, delay: 2 }}
                    />
                  </div>
                </div>
              </FloatingCard>

              <FloatingCard delay={2} className="absolute -bottom-8 -right-8 z-10">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 w-52">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-semibold text-gray-800">Smart Alerts</div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600 bg-green-100 rounded-lg p-2">
                      💡 Save $120 by switching providers
                    </div>
                    <div className="text-xs text-gray-600 bg-blue-100 rounded-lg p-2">
                      📈 Investment opportunity detected
                    </div>
                  </div>
                </div>
              </FloatingCard>

              <FloatingCard delay={2.5} className="absolute top-1/2 -left-20 z-5">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 w-40">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <CurrencyDollarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-semibold text-gray-800">AI Savings</div>
                    <div className="text-lg font-bold text-purple-600">$1,247</div>
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* REST OF THE ORIGINAL CONTENT REMAINS UNCHANGED */}
      <div className="relative pt-20 pb-12 overflow-hidden bg-gray-50">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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