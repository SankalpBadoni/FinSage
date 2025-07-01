import { createContext, useContext, useState, useEffect } from 'react';

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [budgetData, setBudgetData] = useState({
    currentMonth: {},
    history: []
  });

  // Add new monthly data
  const addMonthlyData = (expenses, date = new Date()) => {
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    setBudgetData(prev => {
      // Find if there's existing data for this month
      const existingIndex = prev.history.findIndex(item => item.monthKey === monthKey);
      const newHistory = [...prev.history];
      
      const monthData = {
        month: monthYear,
        monthKey,
        ...expenses,
        totalExpenses: Object.entries(expenses)
          .filter(([key]) => key !== 'Monthly Income')
          .reduce((sum, [_, value]) => sum + (value || 0), 0)
      };

      if (existingIndex >= 0) {
        // Update existing month data
        newHistory[existingIndex] = monthData;
      } else {
        // Add new month data
        newHistory.push(monthData);
      }

      // Sort history by date
      newHistory.sort((a, b) => {
        const [yearA, monthA] = a.monthKey.split('-');
        const [yearB, monthB] = b.monthKey.split('-');
        return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
      });

      return {
        currentMonth: expenses,
        history: newHistory
      };
    });
  };

  // Get data for charts
  const getChartData = () => {
    return budgetData.history.map(month => ({
      month: month.month,
      income: month['Monthly Income'] || 0,
      housing: month['Housing'] || 0,
      transportation: month['Transportation'] || 0,
      food: month['Food & Groceries'] || 0,
      healthcare: month['Healthcare'] || 0,
      entertainment: month['Entertainment'] || 0,
      dining: month['Dining Out'] || 0,
      education: month['Education'] || 0,
      debt: month['Debt Payments'] || 0,
      total: month.totalExpenses || 0
    }));
  };

  // Get current month's data
  const getCurrentMonth = () => budgetData.currentMonth;

  return (
    <BudgetContext.Provider value={{ 
      budgetData,
      addMonthlyData,
      getChartData,
      getCurrentMonth
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
