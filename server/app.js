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

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  next();
});

app.use(express.json());

app.use(cookieParser());


const allowedOrigins = [
  'http://localhost:5173',
  'https://fin-sage-rho.vercel.app',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
}));


app.use('/api/auth', authRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/investments', investmentRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
