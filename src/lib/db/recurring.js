import { v4 as uuidv4 } from 'uuid';
import { recurringDB } from './config';

export const getAllRecurringTemplates = async () => {
  const templates = [];
  await recurringDB.iterate((value) => {
    templates.push(value);
  });
  return templates;
};

export const getActiveRecurringTemplates = async () => {
  const all = await getAllRecurringTemplates();
  return all.filter(t => t.active);
};

export const getRecurringTemplate = async (id) => {
  return await recurringDB.getItem(id);
};

export const addRecurringTemplate = async (template) => {
  const newTemplate = {
    id: uuidv4(),
    ...template,
    active: template.active !== undefined ? template.active : true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  await recurringDB.setItem(newTemplate.id, newTemplate);
  return newTemplate;
};

export const updateRecurringTemplate = async (id, updates) => {
  const template = await recurringDB.getItem(id);
  if (!template) {
    throw new Error(`Recurring template with id ${id} not found`);
  }
  const updated = {
    ...template,
    ...updates,
    updatedAt: Date.now()
  };
  await recurringDB.setItem(id, updated);
  return updated;
};

export const deleteRecurringTemplate = async (id) => {
  await recurringDB.removeItem(id);
};

export const clearAllRecurringTemplates = async () => {
  await recurringDB.clear();
};
