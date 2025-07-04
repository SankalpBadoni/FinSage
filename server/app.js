import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import budgetRoutes from './routes/budget.route.js';
import investmentRoutes from './routes/investment.route.js';

dotenv.config();

connectDB();

const app = express();

// Trust proxy - required for secure cookies in production
app.set('trust proxy', 1);

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  console.log('Cookies:', req.cookies);
  console.log('Headers:', req.headers);
  next();
});

app.use(express.json());
app.use(cookieParser());

// Global middleware to set cookie options based on environment
app.use((req, res, next) => {
  res.cookie = res.cookie.bind(res);
  const originalCookie = res.cookie;
  res.cookie = function (name, value, options = {}) {
    const isSecure = process.env.NODE_ENV === 'production';
    const defaultOptions = {
      httpOnly: true,
      secure: isSecure,
      sameSite: isSecure ? 'none' : 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };
    return originalCookie.call(this, name, value, { ...defaultOptions, ...options });
  };
  next();
});

const allowedOrigins = [
  'http://localhost:5173',
  'https://fin-sage-rho.vercel.app',
  'https://finsage-d52w.onrender.com'
];

// CORS configuration with proper cookie handling
app.use(cors({
  origin: function(origin, callback) {
    // For development/testing - allow requests with no origin
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Origin not allowed:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use('/api/auth', authRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/investments', investmentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
