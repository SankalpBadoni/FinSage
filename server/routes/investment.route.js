import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Fallback investment options if API fails
const fallbackOptions = {
  lowRisk: [
    {
      title: "High-Yield Savings Account",
      description: "FDIC-insured savings account with competitive interest rates",
      expectedReturn: "3-4% annually",
      minAmount: 100,
      considerations: [
        "Highly liquid - easy access to funds",
        "FDIC insured up to $250,000",
        "Interest rates may vary with market conditions"
      ]
    },
    {
      title: "Government Bonds",
      description: "Government-backed securities with fixed interest rates",
      expectedReturn: "2-5% annually",
      minAmount: 1000,
      considerations: [
        "Backed by full faith of US government",
        "Interest payments every 6 months",
        "Can be sold before maturity in secondary market"
      ]
    }
  ],
  moderateRisk: [
    {
      title: "Index Funds",
      description: "Diversified portfolio tracking major market indices",
      expectedReturn: "7-10% annually",
      minAmount: 1000,
      considerations: [
        "Broad market exposure",
        "Lower fees than active funds",
        "Long-term growth potential"
      ]
    },
    {
      title: "Blue-Chip Dividend Stocks",
      description: "Stable companies with regular dividend payments",
      expectedReturn: "6-8% annually",
      minAmount: 500,
      considerations: [
        "Regular dividend income",
        "Potential for capital appreciation",
        "Individual stock market risk"
      ]
    }
  ],
  highRisk: [
    {
      title: "Growth Stocks",
      description: "Companies with high growth potential",
      expectedReturn: "10-15% or more annually",
      minAmount: 1000,
      considerations: [
        "Higher potential returns",
        "Greater volatility",
        "Requires market research"
      ]
    },
    {
      title: "Emerging Market Funds",
      description: "Investments in developing economies",
      expectedReturn: "8-12% annually",
      minAmount: 2000,
      considerations: [
        "High growth potential",
        "Political and currency risks",
        "Market volatility"
      ]
    }
  ]
};

router.post('/recommendations', async (req, res) => {
  try {
    const { savings } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      console.log('No Gemini API key found, using fallback options');
      return res.json(fallbackOptions);
    }
    
    // Prompt for Gemini API
    const prompt = `Generate investment recommendations for $${savings} in savings.
    Return ONLY a JSON object with NO markdown formatting or code blocks.
    The object should have three arrays: lowRisk, moderateRisk, and highRisk.
    Each investment option should have:
    {
      "title": "investment name",
      "description": "brief description",
      "expectedReturn": "return range as string",
      "minAmount": number,
      "considerations": ["point 1", "point 2", "point 3"]
    }
    Each risk category should have 2-3 investment options.`;

    // Generate response using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Remove any markdown formatting if present
    const jsonStr = text.replace(/```json\n|\n```|```/g, '').trim();
    
    try {
      const recommendations = JSON.parse(jsonStr);
      
      // Validate the response structure
      if (!recommendations.lowRisk || !recommendations.moderateRisk || !recommendations.highRisk) {
        throw new Error('Invalid response structure');
      }
      
      res.json(recommendations);
    } catch (parseError) {
      console.log('Error parsing Gemini response, using fallback options:', parseError);
      res.json(fallbackOptions);
    }
  } catch (error) {
    console.error('Investment recommendation error:', error);
    // Return fallback options instead of error to ensure frontend always gets data
    res.json(fallbackOptions);
  }
});

export default router;
