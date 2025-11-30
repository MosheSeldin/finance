import { v4 as uuidv4 } from 'uuid';
import { expensesDB } from './config';

export const getAllExpenses = async () => {
  const expenses = [];
  await expensesDB.iterate((value) => {
    expenses.push(value);
  });
  return expenses;
};

export const getExpensesByMonth = async (year, month) => {
  const allExpenses = await getAllExpenses();
  return allExpenses.filter(e => {
    const [y, m] = e.date.split('-');
    return parseInt(y) === year && parseInt(m) === month;
  });
};

export const getExpense = async (id) => {
  return await expensesDB.getItem(id);
};

export const addExpense = async (expense) => {
  const newExpense = {
    id: uuidv4(),
    ...expense,
    recurring: expense.recurring || false,
    recurringId: expense.recurringId || null,
    importSource: expense.importSource || 'manual',
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  await expensesDB.setItem(newExpense.id, newExpense);
  return newExpense;
};

export const updateExpense = async (id, updates) => {
  const expense = await expensesDB.getItem(id);
  if (!expense) {
    throw new Error(`Expense with id ${id} not found`);
  }
  const updated = {
    ...expense,
    ...updates,
    updatedAt: Date.now()
  };
  await expensesDB.setItem(id, updated);
  return updated;
};

export const deleteExpense = async (id) => {
  await expensesDB.removeItem(id);
};

export const clearAllExpenses = async () => {
  await expensesDB.clear();
};
