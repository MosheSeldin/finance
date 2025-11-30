import { useFinance } from '../contexts/FinanceContext';
import {
  addIncome as dbAddIncome,
  updateIncome as dbUpdateIncome,
  deleteIncome as dbDeleteIncome
} from '../lib/db';

export function useIncome() {
  const { state, dispatch } = useFinance();

  const addIncome = async (income) => {
    try {
      const newIncome = await dbAddIncome(income);
      dispatch({ type: 'ADD_INCOME', payload: newIncome });
      return newIncome;
    } catch (error) {
      console.error('Failed to add income:', error);
      throw error;
    }
  };

  const updateIncome = async (id, updates) => {
    try {
      const updated = await dbUpdateIncome(id, updates);
      dispatch({ type: 'UPDATE_INCOME', payload: updated });
      return updated;
    } catch (error) {
      console.error('Failed to update income:', error);
      throw error;
    }
  };

  const deleteIncome = async (id) => {
    try {
      await dbDeleteIncome(id);
      dispatch({ type: 'DELETE_INCOME', payload: id });
    } catch (error) {
      console.error('Failed to delete income:', error);
      throw error;
    }
  };

  return {
    income: state.income,
    addIncome,
    updateIncome,
    deleteIncome
  };
}
