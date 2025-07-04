import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budgetData, setBudgetData] = useState({
    currentMonth: {},
    history: []
  });
  const { user } = useAuth();

  // Fetch all budgets when user logs in
  useEffect(() => {
    if (user) {
      fetchBudgets();
    }
  }, [user]);

  // Fetch all budgets from API
  const fetchBudgets = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/budgets`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        const formattedHistory = data.data.map(budget => ({
          month: budget.monthYear,
          monthKey: budget.monthKey,
          ...budget.expenses,
          'Monthly Income': budget.expenses['Monthly Income'] || 0,
          totalExpenses: budget.totalExpenses
        }));

        // Sort history by date
        formattedHistory.sort((a, b) => {
          const [yearA, monthA] = a.monthKey.split('-');
          const [yearB, monthB] = b.monthKey.split('-');
          return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
        });

        setBudgetData({
          currentMonth: formattedHistory[formattedHistory.length - 1] || {},
          history: formattedHistory
        });
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  // Add new monthly data
  const addMonthlyData = async (expenses, date) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/budgets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          expenses,
          date: date.toISOString()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchBudgets(); // Refresh all budget data
      }
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  // Get data for charts
  const getChartData = () => {
    return budgetData.history;
  };

  // Get current month's data
  const getCurrentMonth = () => budgetData.currentMonth;

  // Get budget for a specific month
  const getBudgetByMonth = async (monthKey) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/budgets/${monthKey}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        return {
          ...data.data,
          expenses: data.data.expenses || {}
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching budget:', error);
      return null;
    }
  };

  return (
    <BudgetContext.Provider value={{ 
      budgetData,
      addMonthlyData,
      getChartData,
      getCurrentMonth,
      getBudgetByMonth,
      fetchBudgets
    }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}
