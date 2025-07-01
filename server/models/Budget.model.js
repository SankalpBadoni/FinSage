import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  monthYear: {
    type: String,
    required: true
  },
  monthKey: {
    type: String,
    required: true
  },
  income: {
    monthlyIncome: {
      type: Number,
      default: 0
    }
  },
  expenses: {
    housing: { type: Number, default: 0 },
    transportation: { type: Number, default: 0 },
    foodAndGroceries: { type: Number, default: 0 },
    healthcare: { type: Number, default: 0 },
    entertainment: { type: Number, default: 0 },
    diningOut: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    debtPayments: { type: Number, default: 0 }
  },
  totalExpenses: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index for user and monthKey to ensure uniqueness
budgetSchema.index({ user: 1, monthKey: 1 }, { unique: true });

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
