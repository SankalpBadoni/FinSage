import express from 'express';
import { createBudget, getBudgets, getBudgetByMonth } from '../controllers/budget.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protect all routes in this router
router.use(protect);

router.route('/')
  .post(createBudget)
  .get(getBudgets);

router.route('/:monthKey')
  .get(getBudgetByMonth);

export default router;
