import { v4 as uuidv4 } from 'uuid';
import { categoriesDB } from './config';

// Default categories
export const DEFAULT_CATEGORIES = [
  { name: 'קניות סופר', icon: '🛒', color: '#10b981', isDefault: true },
  { name: 'דלק', icon: '⛽', color: '#f59e0b', isDefault: true },
  { name: 'תחבורה', icon: '🚌', color: '#06b6d4', isDefault: true },
  { name: 'אוכל בחוץ', icon: '🍽️', color: '#ec4899', isDefault: true },
  { name: 'בריאות', icon: '🏥', color: '#ef4444', isDefault: true },
  { name: 'התפתחות אישית', icon: '📚', color: '#8b5cf6', isDefault: true },
  { name: 'בילויים', icon: '🎬', color: '#a855f7', isDefault: true },
  { name: 'מתנות', icon: '🎁', color: '#f97316', isDefault: true },
  { name: 'ביגוד', icon: '👕', color: '#3b82f6', isDefault: true },
  { name: 'טיפוח', icon: '💇', color: '#22c55e', isDefault: true },
  { name: 'חשבונות קבועים', icon: '📱', color: '#6366f1', isDefault: true },
  { name: 'מנויים', icon: '📱', color: '#84cc16', isDefault: true },
  { name: 'קניות לבית', icon: '🏠', color: '#14b8a6', isDefault: true },
  { name: 'חתולים', icon: '🐱', color: '#eab308', isDefault: true },
  { name: 'הוצאות עבודה', icon: '💼', color: '#64748b', isDefault: true },
];

export const initializeDefaultCategories = async () => {
  const existing = await getAllCategories();
  if (existing.length > 0) {
    return; // Already initialized
  }

  for (const category of DEFAULT_CATEGORIES) {
    await addCategory(category);
  }
};

export const getAllCategories = async () => {
  const categories = [];
  await categoriesDB.iterate((value) => {
    categories.push(value);
  });
  return categories;
};

export const getCategory = async (id) => {
  return await categoriesDB.getItem(id);
};

export const addCategory = async (category) => {
  const newCategory = {
    id: uuidv4(),
    ...category,
    isDefault: category.isDefault || false,
    createdAt: Date.now()
  };
  await categoriesDB.setItem(newCategory.id, newCategory);
  return newCategory;
};

export const updateCategory = async (id, updates) => {
  const category = await categoriesDB.getItem(id);
  if (!category) {
    throw new Error(`Category with id ${id} not found`);
  }
  const updated = {
    ...category,
    ...updates
  };
  await categoriesDB.setItem(id, updated);
  return updated;
};

export const deleteCategory = async (id) => {
  const category = await categoriesDB.getItem(id);
  if (category && category.isDefault) {
    throw new Error('Cannot delete default category');
  }
  await categoriesDB.removeItem(id);
};

export const clearAllCategories = async () => {
  await categoriesDB.clear();
};
