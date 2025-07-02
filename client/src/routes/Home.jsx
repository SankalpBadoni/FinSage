import { motion, useScroll, useInView } from 'framer-motion';
import { 
  ArrowRightIcon, 
  ChartBarIcon, 
  BanknotesIcon, 
  ArrowTrendingUpIcon, 
  ChartPieIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Smart Expense Tracking',
    description: 'Automatically categorize and track your spending patterns with our intelligent expense monitoring system.',
    icon: <ChartBarIcon className="w-6 h-6" />,
    color: 'from-slate-600 to-slate-800'
  },
  {
    title: 'Budget Planning',
    description: 'Create personalized budgets based on your income and lifestyle, with smart recommendations for each spending category.',
    icon: <BanknotesIcon className="w-6 h-6" />,
    color: 'from-blue-700 to-blue-900'
  },
  {
    title: 'Savings Goals',
    description: 'Set and track your savings goals with visual progress indicators and achievement milestones.',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    color: 'from-emerald-700 to-emerald-900'
  },
  {
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations on where to cut expenses and how to optimize your spending habits.',
    icon: <ArrowTrendingUpIcon className="w-6 h-6" />,
    color: 'from-amber-600 to-amber-800'
  },
  {
    title: 'Secure Data',
    description: 'Your financial data is protected with bank-level encryption and secure cloud storage.',
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    color: 'from-red-700 to-red-900'
  },
  {
    title: 'Investment Guidance',
    description: 'Receive tailored investment suggestions based on your savings potential and financial goals.',
    icon: <UserGroupIcon className="w-6 h-6" />,
    color: 'from-purple-700 to-purple-900'
  },
];

const testimonials = [
  {
    name: 'Emily Rodriguez',
    role: 'Young Professional',
    content: 'This app helped me find over $300 in monthly savings! The AI suggestions were spot-on, and now I\'m finally building my emergency fund.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 5
  },
  {
    name: 'Marcus Chen',
    role: 'Small Business Owner',
    content: 'I was amazed to see how much I could save by tracking my expenses. The investment suggestions helped me put my savings to work.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 5
  },
  {
    name: 'Sarah Thompson',
    role: 'Freelance Designer',
    content: 'Perfect for managing irregular income! The budgeting tools helped me smooth out my spending and build a reliable savings plan.',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    rating: 5
  },
];

const stats = [
  { 
    label: 'Average Savings Found',
    value: '$450+',
    description: 'Monthly savings potential per user',
    icon: <ChartPieIcon className="w-8 h-8" />
  },
  { 
    label: 'Active Users',
    value: '100K+',
    description: 'Growing community of savers',
    icon: <UserGroupIcon className="w-8 h-8" />
  },
  { 
    label: 'Expense Categories',
    value: '50+',
    description: 'Detailed spending insights',
    icon: <ArrowTrendingUpIcon className="w-8 h-8" />
  },
  { 
    label: 'Success Rate',
    value: '92%',
    description: 'Users achieving savings goals',
    icon: <StarIcon className="w-8 h-8" />
  },
];

function ProfessionalCard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02}deg) rotateX(${-mousePosition.y * 0.02}deg)`,
      }}
    >
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Monthly Overview</h3>
              <p className="text-slate-300 text-sm">Your Financial Summary</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <ChartPieIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">$5,200</div>
              <div className="text-sm text-slate-600 font-medium">Monthly Income</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">$850</div>
              <div className="text-sm text-slate-600 font-medium">Potential Savings</div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            {[
              { label: 'Housing & Utilities', amount: '$1,800', percentage: '35%', color: 'bg-blue-600' },
              { label: 'Food & Groceries', amount: '$800', percentage: '15%', color: 'bg-emerald-600' },
              { label: 'Transportation', amount: '$600', percentage: '12%', color: 'bg-amber-600' },
              { label: 'Entertainment', amount: '$400', percentage: '8%', color: 'bg-slate-600' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-slate-700 font-medium text-sm">{item.label}</span>
                </div>
                <div className="text-right">
                  <div className="text-slate-900 font-semibold text-sm">{item.amount}</div>
                  <div className="text-slate-500 text-xs">{item.percentage}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-slate-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-700 font-medium text-sm">Monthly Budget Progress</span>
              <span className="text-emerald-600 font-semibold text-sm">16% Saved</span>
            </div>
            <div className="h-16 bg-gradient-to-r from-slate-200 via-emerald-100 to-emerald-200 rounded-md relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-60"
                initial={{ width: 0 }}
                animate={{ width: '76%' }}
                transition={{ duration: 2, ease: 'easeOut', delay: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SophisticatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Professional gradient base */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
        }}
      />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/20"
            style={{
              width: `${200 + Math.random() * 300}px`,
              height: `${200 + Math.random() * 300}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: i % 3 === 0 ? '50%' : '0%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Professional dots pattern */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProfessionalFinanceHome() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-slate-50 w-full">
      {/* SOPHISTICATED HERO SECTION */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
        <SophisticatedBackground />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-center min-h-screen py-20 w-full">
            
            {/* Left Column - Professional Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -60 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-left space-y-8"
            >
              {/* Professional Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white font-medium text-sm">Smart Personal Finance Management</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                  <span className="block">Take Control of</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                    Your Finances
                  </span>
                </h1>
              </motion.div>

              {/* Professional Description */}
              <motion.p 
                className="text-xl text-slate-200 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Track your income and expenses effortlessly. Get personalized insights on where you 
                can save money, and learn how to invest your savings wisely. Start your journey to 
                financial freedom today.
              </motion.p>

              {/* Professional CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <Link to="/budget">
                    <span>Start Budgeting</span>
                  </Link>
                    <ArrowRightIcon className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  View Demo
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center space-x-8 pt-8 border-t border-white/10"
              >
                <div className="text-white/90">
                  <div className="text-2xl font-bold">30%</div>
                  <div className="text-sm text-slate-300">Average Monthly Savings</div>
                </div>
                <div className="text-white/90">
                  <div className="text-2xl font-bold">5min</div>
                  <div className="text-sm text-slate-300">Setup Time</div>
                </div>
                <div className="text-white/90">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-slate-300">Free to Use</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Professional Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative h-full flex items-center justify-center"
            >
              <ProfessionalCard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="relative py-24 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 2xl:px-16">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Smart Money Management
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our easy-to-use tools help you understand your spending habits, find savings 
                opportunities, and make better financial decisions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="relative py-24 bg-slate-900 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 2xl:px-16">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Real Results
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Join thousands of users who have transformed their financial habits and achieved their savings goals.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
                >
                  <div className="text-emerald-400 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-slate-200 mb-1">{stat.label}</div>
                  <div className="text-sm text-slate-400">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="relative py-24 bg-slate-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-12 2xl:px-16">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                User Success Stories
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Discover how people like you are saving more and spending smarter with our app.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-8 border border-slate-200"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}