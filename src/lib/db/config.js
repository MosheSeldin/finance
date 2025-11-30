import localforage from 'localforage';

// Initialize stores
export const expensesDB = localforage.createInstance({
  name: 'finance-app',
  storeName: 'expenses'
});

export const incomeDB = localforage.createInstance({
  name: 'finance-app',
  storeName: 'income'
});

export const recurringDB = localforage.createInstance({
  name: 'finance-app',
  storeName: 'recurring_templates'
});

export const budgetsDB = localforage.createInstance({
  name: 'finance-app',
  storeName: 'budgets'
});

export const categoriesDB = localforage.createInstance({
  name: 'finance-app',
  storeName: 'categories'
});

export const settingsDB = localforage.createInstance({
  name: 'finance-app',
  storeName: 'settings'
});
