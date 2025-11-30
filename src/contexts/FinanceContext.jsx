import React, { createContext, useReducer, useEffect, useContext } from 'react';
import {
  getAllExpenses,
  getAllIncome,
  getExpensesByMonth,
  getIncomeByMonth,
  initializeDefaultCategories
} from '../lib/db';
import { seedNovemberData } from '../lib/db/seedData';

const FinanceContext = createContext();

const initialState = {
  expenses: [],
  income: [],
  selectedMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
  filterPerson: 'all',
  loading: true,
  error: null
};

function financeReducer(state, action) {
  switch (action.type) {
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(e =>
          e.id === action.payload.id ? action.payload : e
        )
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(e => e.id !== action.payload)
      };
    case 'SET_INCOME':
      return { ...state, income: action.payload };
    case 'ADD_INCOME':
      return { ...state, income: [...state.income, action.payload] };
    case 'UPDATE_INCOME':
      return {
        ...state,
        income: state.income.map(i =>
          i.id === action.payload.id ? action.payload : i
        )
      };
    case 'DELETE_INCOME':
      return {
        ...state,
        income: state.income.filter(i => i.id !== action.payload)
      };
    case 'SET_MONTH':
      return {
        ...state,
        selectedMonth: action.payload.month,
        selectedYear: action.payload.year
      };
    case 'SET_FILTER_PERSON':
      return { ...state, filterPerson: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      try {
        // Initialize default categories if needed
        await initializeDefaultCategories();

        // Seed November data if this is first run
        await seedNovemberData();

        // Load all expenses and income
        const expenses = await getAllExpenses();
        const income = await getAllIncome();

        dispatch({ type: 'SET_EXPENSES', payload: expenses });
        dispatch({ type: 'SET_INCOME', payload: income });
      } catch (error) {
        console.error('Failed to load data:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
    loadData();
  }, []);

  // Reload data when month changes
  useEffect(() => {
    async function loadMonthData() {
      try {
        const expenses = await getExpensesByMonth(state.selectedYear, state.selectedMonth);
        const income = await getIncomeByMonth(state.selectedYear, state.selectedMonth);

        dispatch({ type: 'SET_EXPENSES', payload: expenses });
        dispatch({ type: 'SET_INCOME', payload: income });
      } catch (error) {
        console.error('Failed to load month data:', error);
      }
    }

    if (!state.loading) {
      loadMonthData();
    }
  }, [state.selectedMonth, state.selectedYear, state.loading]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
