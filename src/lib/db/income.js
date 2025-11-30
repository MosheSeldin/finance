import { v4 as uuidv4 } from 'uuid';
import { incomeDB } from './config';

export const getAllIncome = async () => {
  const income = [];
  await incomeDB.iterate((value) => {
    income.push(value);
  });
  return income;
};

export const getIncomeByMonth = async (year, month) => {
  const allIncome = await getAllIncome();
  return allIncome.filter(i => {
    const [y, m] = i.date.split('-');
    return parseInt(y) === year && parseInt(m) === month;
  });
};

export const getIncome = async (id) => {
  return await incomeDB.getItem(id);
};

export const addIncome = async (income) => {
  const newIncome = {
    id: uuidv4(),
    ...income,
    recurring: income.recurring || false,
    recurringId: income.recurringId || null,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  await incomeDB.setItem(newIncome.id, newIncome);
  return newIncome;
};

export const updateIncome = async (id, updates) => {
  const income = await incomeDB.getItem(id);
  if (!income) {
    throw new Error(`Income with id ${id} not found`);
  }
  const updated = {
    ...income,
    ...updates,
    updatedAt: Date.now()
  };
  await incomeDB.setItem(id, updated);
  return updated;
};

export const deleteIncome = async (id) => {
  await incomeDB.removeItem(id);
};

export const clearAllIncome = async () => {
  await incomeDB.clear();
};
