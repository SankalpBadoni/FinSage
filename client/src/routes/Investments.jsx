import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const RiskCard = ({ name, description, expectedReturn, riskLevel, minAmount = 0, considerations = [] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="backdrop-blur-xl bg-black/30 rounded-xl overflow-hidden border border-white/10"
  >
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <div className={`${
          riskLevel === 'Low' ? 'bg-emerald-500' : 
          riskLevel === 'Moderate' ? 'bg-amber-500' : 
          'bg-rose-500'
        } bg-opacity-20 p-3 rounded-lg`}>
          {riskLevel === 'Low' ? <ShieldCheckIcon className="w-6 h-6 text-emerald-400" /> :
           riskLevel === 'Moderate' ? <ArrowTrendingUpIcon className="w-6 h-6 text-amber-400" /> :
           <CurrencyDollarIcon className="w-6 h-6 text-rose-400" />}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-sm text-white/70">Expected Return: {expectedReturn}</p>
        </div>
      </div>
      <p className="mt-4 text-white/80">{description}</p>
      {typeof minAmount === 'number' && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-white/60">Min. Investment:</span>
          <span className="text-sm font-medium text-white">${minAmount.toLocaleString()}</span>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white/60">Risk Level:</span>
        <span className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-300' : 
            riskLevel === 'Moderate' ? 'bg-amber-500/20 text-amber-300' : 
            'bg-rose-500/20 text-rose-300'}
        `}>
          {riskLevel}
        </span>
      </div>
      {considerations && considerations.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-white/60 mb-2">Key Considerations:</h4>
          <ul className="space-y-2">
            {considerations.map((item, index) => (
              <li key={index} className="text-sm text-white/80 flex items-center">
                <span className="mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2 px-4 rounded-md hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/20">
        Learn More
      </button>
    </div>
  </motion.div>
);

export default function Investments() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savingsAmount, setSavingsAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!savingsAmount) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/investments/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savings: parseFloat(savingsAmount) })
      });

      if (!response.ok) throw new Error('Failed to fetch recommendations');
      
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg border border-white/10 p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Investment Recommendations</h1>
          <p className="mt-2 text-white/80">
            Enter your savings amount to get personalized investment options tailored to different risk levels
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">$</span>
              <input
                type="number"
                value={savingsAmount}
                onChange={(e) => setSavingsAmount(e.target.value)}
                placeholder="Enter your savings"
                className="w-full pl-8 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50"
                min="0"
                step="100"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !savingsAmount}
            >
              Get Recommendations
            </button>
          </form>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="text-white/80 mt-4">Generating personalized recommendations...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-rose-400">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-rose-500/20 text-rose-300 rounded-md hover:bg-rose-500/30"
            >
              Try Again
            </button>
          </div>
        ) : recommendations && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg border border-white/10 p-8 mb-8"
            >
              <p className="text-white/80">
                Based on your savings of <span className="font-semibold text-emerald-400">${savingsAmount.toLocaleString()}</span>,
                here are personalized investment options tailored to different risk levels:
              </p>
            </motion.div>

            <div className="space-y-8">
              {recommendations.lowRisk.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white/90 mb-4">Conservative Investments</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">                  {recommendations.lowRisk.map((option, index) => (
                    <RiskCard 
                      key={index} 
                      {...option} 
                      name={option.name || option.title}
                      riskLevel="Low" 
                    />
                  ))}
                </div>
              </div>
            )}

            {recommendations.moderateRisk.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-white/90 mb-4">Balanced Investments</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.moderateRisk.map((option, index) => (
                      <RiskCard 
                        key={index} 
                        {...option} 
                        name={option.name || option.title}
                        riskLevel="Moderate" 
                      />
                    ))}
                  </div>
                </div>
              )}

              {recommendations.highRisk.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-white/90 mb-4">Growth Investments</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.highRisk.map((option, index) => (
                      <RiskCard 
                        key={index} 
                        {...option} 
                        name={option.name || option.title}
                        riskLevel="High" 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 backdrop-blur-xl bg-black/30 rounded-2xl shadow-lg border border-white/10 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Smart Investment Tips</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400">✓</span>
                  </div>
                  <p className="ml-3 text-white/80">Diversify your portfolio across different asset classes and risk levels</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400">✓</span>
                  </div>
                  <p className="ml-3 text-white/80">Consider starting with lower-risk options and gradually increase exposure</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400">✓</span>
                  </div>
                  <p className="ml-3 text-white/80">Regularly review and rebalance your portfolio based on performance</p>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
