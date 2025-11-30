import { v4 as uuidv4 } from 'uuid';
import { budgetsDB } from './config';

export const getAllBudgets = async () => {
  const budgets = [];
  await budgetsDB.iterate((value) => {
    budgets.push(value);
  });
  return budgets;
};

export const getBudgetsByMonth = async (year, month) => {
  const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
  const allBudgets = await getAllBudgets();
  return allBudgets.filter(b => b.month === monthKey);
};

export const getBudget = async (id) => {
  return await budgetsDB.getItem(id);
};

export const addBudget = async (budget) => {
  const newBudget = {
    id: uuidv4(),
    ...budget,
    createdAt: Date.now()
  };
  await budgetsDB.setItem(newBudget.id, newBudget);
  return newBudget;
};

export const updateBudget = async (id, updates) => {
  const budget = await budgetsDB.getItem(id);
  if (!budget) {
    throw new Error(`Budget with id ${id} not found`);
  }
  const updated = {
    ...budget,
    ...updates
  };
  await budgetsDB.setItem(id, updated);
  return updated;
};

export const deleteBudget = async (id) => {
  await budgetsDB.removeItem(id);
};

export const clearAllBudgets = async () => {
  await budgetsDB.clear();
};
