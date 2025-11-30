import { settingsDB } from './config';

const SETTINGS_KEY = 'app_settings';

export const getSettings = async () => {
  const settings = await settingsDB.getItem(SETTINGS_KEY);
  if (!settings) {
    // Return default settings
    return {
      id: SETTINGS_KEY,
      monthlyIncome: 15820, // משה 6019.77 + מעיין 6800 + מתנה 3000
      passwordHash: null,
      defaultPerson: 'משה',
      theme: 'dark'
    };
  }
  return settings;
};

export const updateSettings = async (updates) => {
  const current = await getSettings();
  const updated = {
    ...current,
    ...updates
  };
  await settingsDB.setItem(SETTINGS_KEY, updated);
  return updated;
};

export const clearSettings = async () => {
  await settingsDB.clear();
};
