import Budget from '../models/Budget.model.js';

// @desc    Create or update a budget for a specific month
// @route   POST /api/budgets
export const createBudget = async (req, res) => {
  try {
    const { expenses, date } = req.body;
    const userId = req.user.id;

    // Create a monthKey in YYYY-MM format
    const budgetDate = new Date(date);
    const monthKey = `${budgetDate.getFullYear()}-${String(budgetDate.getMonth() + 1).padStart(2, '0')}`;
    const monthYear = budgetDate.toLocaleString('default', { month: 'short', year: 'numeric' });

    // Calculate total expenses (excluding Monthly Income)
    const totalExpenses = Object.entries(expenses)
      .filter(([key]) => key !== 'Monthly Income')
      .reduce((sum, [_, value]) => sum + (value || 0), 0);

    // Map frontend expenses to database structure
    const mappedExpenses = {
      housing: expenses['Housing'] || 0,
      transportation: expenses['Transportation'] || 0,
      foodAndGroceries: expenses['Food & Groceries'] || 0,
      healthcare: expenses['Healthcare'] || 0,
      entertainment: expenses['Entertainment'] || 0,
      diningOut: expenses['Dining Out'] || 0,
      education: expenses['Education'] || 0,
      debtPayments: expenses['Debt Payments'] || 0
    };

    // Try to find existing budget for this month
    let budget = await Budget.findOne({ user: userId, monthKey });

    if (budget) {
      // Update existing budget
      budget.expenses = mappedExpenses;
      budget.income.monthlyIncome = expenses['Monthly Income'] || 0;
      budget.totalExpenses = totalExpenses;
      budget = await budget.save();
    } else {
      // Create new budget
      budget = await Budget.create({
        user: userId,
        monthKey,
        monthYear,
        income: {
          monthlyIncome: expenses['Monthly Income'] || 0
        },
        expenses: mappedExpenses,
        totalExpenses
      });
    }

    // Transform the data for frontend
    const responseData = {
      monthYear: budget.monthYear,
      monthKey: budget.monthKey,
      expenses: {
        'Monthly Income': budget.income.monthlyIncome,
        'Housing': budget.expenses.housing,
        'Transportation': budget.expenses.transportation,
        'Food & Groceries': budget.expenses.foodAndGroceries,
        'Healthcare': budget.expenses.healthcare,
        'Entertainment': budget.expenses.entertainment,
        'Dining Out': budget.expenses.diningOut,
        'Education': budget.expenses.education,
        'Debt Payments': budget.expenses.debtPayments
      },
      totalExpenses: budget.totalExpenses
    };

    res.status(200).json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error('Create Budget Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all budgets for a user
// @route   GET /api/budgets
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).sort({ monthKey: -1 });

    // Transform the data for frontend
    const transformedBudgets = budgets.map(budget => ({
      monthYear: budget.monthYear,
      monthKey: budget.monthKey,
      expenses: {
        'Monthly Income': budget.income.monthlyIncome,
        'Housing': budget.expenses.housing,
        'Transportation': budget.expenses.transportation,
        'Food & Groceries': budget.expenses.foodAndGroceries,
        'Healthcare': budget.expenses.healthcare,
        'Entertainment': budget.expenses.entertainment,
        'Dining Out': budget.expenses.diningOut,
        'Education': budget.expenses.education,
        'Debt Payments': budget.expenses.debtPayments
      },
      totalExpenses: budget.totalExpenses
    }));

    res.status(200).json({
      success: true,
      data: transformedBudgets
    });
  } catch (error) {
    console.error('Get Budgets Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get budget for a specific month
// @route   GET /api/budgets/:monthKey
export const getBudgetByMonth = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      user: req.user.id,
      monthKey: req.params.monthKey
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        error: 'Budget not found for this month'
      });
    }

    // Transform the data for frontend
    const transformedBudget = {
      monthYear: budget.monthYear,
      monthKey: budget.monthKey,
      expenses: {
        'Monthly Income': budget.income.monthlyIncome,
        'Housing': budget.expenses.housing,
        'Transportation': budget.expenses.transportation,
        'Food & Groceries': budget.expenses.foodAndGroceries,
        'Healthcare': budget.expenses.healthcare,
        'Entertainment': budget.expenses.entertainment,
        'Dining Out': budget.expenses.diningOut,
        'Education': budget.expenses.education,
        'Debt Payments': budget.expenses.debtPayments
      },
      totalExpenses: budget.totalExpenses
    };

    res.status(200).json({
      success: true,
      data: transformedBudget
    });
  } catch (error) {
    console.error('Get Budget By Month Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
