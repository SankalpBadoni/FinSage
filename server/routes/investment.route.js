import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const stripMarkdown = (text) => {
  return text.replace(/```json\n?|\n?```/g, '').trim();
};

router.post('/recommendations', async (req, res) => {
  try {
    const { savings } = req.body;
    if (!savings || isNaN(savings)) {
      return res.status(400).json({ error: 'Please provide a valid savings amount' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const prompt = `Generate investment recommendations for someone with $${savings} in savings. Format the response as a JSON object with three arrays: lowRisk, moderateRisk, and highRisk. Each array should contain 2-3 investment options appropriate for that risk level, with each option having a "name", "description", and "expectedReturn" (as a string percentage range). Make the recommendations realistic and appropriate for the savings amount.`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    
    const cleanJson = stripMarkdown(responseText);
    const recommendations = JSON.parse(cleanJson);

    res.json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations:', error);

    const fallbackRecommendations = {
      lowRisk: [
        {
          name: "High-Yield Savings Account",
          description: "FDIC-insured savings account with competitive interest rates",
          expectedReturn: "3-4% annually"
        },
        {
          name: "Government Bonds",
          description: "Treasury bonds and bills backed by the U.S. government",
          expectedReturn: "2-5% annually"
        }
      ],
      moderateRisk: [
        {
          name: "Index Funds",
          description: "Diversified funds tracking major market indices",
          expectedReturn: "7-10% annually"
        },
        {
          name: "Blue-Chip Stocks",
          description: "Shares in stable, well-established companies",
          expectedReturn: "8-12% annually"
        }
      ],
      highRisk: [
        {
          name: "Growth Stocks",
          description: "Shares in emerging companies with high growth potential",
          expectedReturn: "15-25% annually"
        },
        {
          name: "Cryptocurrency",
          description: "Digital assets with high volatility",
          expectedReturn: "20-40% annually"
        }
      ]
    };

    res.json(fallbackRecommendations);
  }
});

router.post('/chat', async (req, res) => {
  
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      console.log('Invalid message received:', message);
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Processing chat message:', message);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const prompt = `You are a helpful financial advisor chatbot. Provide helpful, accurate, and personalized financial advice. Keep responses concise but informative. User question: ${message}`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    
    res.json({ reply: responseText });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ 
      reply: 'I apologize, but I\'m having trouble processing your request right now. Please try asking again in a moment.' 
    });
  }
});

export default router;
