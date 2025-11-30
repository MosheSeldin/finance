import { useFinance } from '../contexts/FinanceContext';
import {
  addExpense as dbAddExpense,
  updateExpense as dbUpdateExpense,
  deleteExpense as dbDeleteExpense
} from '../lib/db';

export function useExpenses() {
  const { state, dispatch } = useFinance();

  const addExpense = async (expense) => {
    try {
      const newExpense = await dbAddExpense(expense);
      dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
      return newExpense;
    } catch (error) {
      console.error('Failed to add expense:', error);
      throw error;
    }
  };

  const updateExpense = async (id, updates) => {
    try {
      const updated = await dbUpdateExpense(id, updates);
      dispatch({ type: 'UPDATE_EXPENSE', payload: updated });
      return updated;
    } catch (error) {
      console.error('Failed to update expense:', error);
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await dbDeleteExpense(id);
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    } catch (error) {
      console.error('Failed to delete expense:', error);
      throw error;
    }
  };

  const toggleEssential = async (id) => {
    const expense = state.expenses.find(e => e.id === id);
    if (!expense) return;
    return updateExpense(id, { essential: !expense.essential });
  };

  return {
    expenses: state.expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    toggleEssential
  };
}
