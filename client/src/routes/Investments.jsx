import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CurrencyDollarIcon, ArrowTrendingUpIcon, ShieldCheckIcon, ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const RiskCard = ({ name, description, expectedReturn, riskLevel, minAmount = 0, considerations = [], onLearnMore }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="backdrop-blur-xl bg-black/30 rounded-xl overflow-hidden border border-white/10 h-full"
  >
    <div className="p-6 flex flex-col h-full">
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
      
      <div className="flex-grow">
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
      </div>
      
      <button 
        onClick={() => onLearnMore && onLearnMore(name)}
        className="mt-6 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2 px-4 rounded-md hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/20"
      >
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
  
  // Modal for Learn More
  const [modal, setModal] = useState(null); // { name, details }
  const [modalLoading, setModalLoading] = useState(false);
  
  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi! I\'m your financial advisor bot. Ask me anything about investments, budgeting, or financial planning!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!savingsAmount) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/investments/recommendations`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
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

  // Chat handler function
  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/investments/chat`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ message: userMessage })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Chat response error:', errorText);
        throw new Error(`Failed to get chat response: ${response.status}`);
      }
      
      const data = await response.json();
      setChatMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I couldn\'t process your request right now. Please try again later.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Learn More handler function
  const handleLearnMore = async (investmentName) => {
    setModal({ name: investmentName, details: 'Loading...' });
    setModalLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/investments/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ 
          message: `Provide a comprehensive, detailed explanation about "${investmentName}" as an investment option. Include: what it is, how it works, expected returns, risks involved, liquidity, tax implications, who should consider it, minimum investment requirements, and practical tips for getting started. Make it informative and educational for someone with $${savingsAmount || '10000'} in savings.`
        })
      });
      
      if (!response.ok) throw new Error('Failed to load investment details');
      
      const data = await response.json();
      setModal({ name: investmentName, details: data.reply });
    } catch (err) {
      console.error('Learn more error:', err);
      setModal({ name: investmentName, details: 'Unable to load detailed information at this time. Please try again later.' });
    } finally {
      setModalLoading(false);
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.lowRisk.map((option, index) => (
                      <RiskCard 
                        key={index} 
                        {...option} 
                        name={option.name || option.title}
                        riskLevel="Low" 
                        onLearnMore={handleLearnMore}
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
                        onLearnMore={handleLearnMore}
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
                        onLearnMore={handleLearnMore}
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
        
        {/* Learn More Modal */}
        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{modal.name}</h3>
                  <p className="text-emerald-100 text-sm">Detailed Investment Guide</p>
                </div>
                <button 
                  onClick={() => setModal(null)}
                  className="text-white hover:text-gray-200 transition-colors p-2"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {modalLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                      <span className="text-white">Loading detailed information...</span>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <div className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                      {modal.details}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-800/50 px-6 py-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-white/70">
                    This information is for educational purposes only. Please consult a financial advisor for personalized advice.
                  </p>
                  <button 
                    onClick={() => setModal(null)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Chatbot */}
        <div className="fixed bottom-6 right-6 z-50">
          {chatOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-80 h-96 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">FinBot</span>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900/50">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                ))}
                
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white border border-white/20 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-white/70">FinBot is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/20 bg-gray-900/70">
                <div className="flex items-center space-x-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder="Ask me about investments..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-emerald-500/50 text-sm"
                    disabled={chatLoading}
                  />
                  <button
                    onClick={handleChatSend}
                    disabled={chatLoading || !chatInput.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-2 rounded-lg transition-colors"
                  >
                    <PaperAirplaneIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setChatOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 p-4 rounded-full shadow-2xl text-white transition-all duration-300"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
