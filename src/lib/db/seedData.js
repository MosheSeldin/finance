import { addExpense, addIncome, getAllExpenses } from './index';
import { settingsDB } from './config';

const NOVEMBER_EXPENSES = [
  // משה - נובמבר 2025
  { date: '2025-11-29', note: 'חניכה מתקדמת', amount: 1250, category: 'התפתחות אישית', person: 'משה', essential: true },
  { date: '2025-11-29', note: 'קניות Black Friday', amount: 2321, category: 'קניות לבית', person: 'משה', essential: false },
  { date: '2025-11-29', note: 'כללית', amount: 55.74, category: 'בריאות', person: 'משה', essential: true },
  { date: '2025-11-29', note: 'Moovit', amount: 169, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2025-11-29', note: 'סלקום', amount: 59.78, category: 'חשבונות קבועים', person: 'משה', essential: true },
  { date: '2025-11-29', note: 'כביש 6', amount: 4.98, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2025-11-28', note: 'השלמת קניות', amount: 85.04, category: 'קניות סופר', person: 'משה', essential: true },
  { date: '2025-11-27', note: 'פלאפל', amount: 29, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-27', note: 'קפה', amount: 9, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-27', note: 'סנדוויץ טונה', amount: 24, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-27', note: 'דלק', amount: 253.23, category: 'דלק', person: 'משה', essential: true },
  { date: '2025-11-26', note: 'בורקס וקפה', amount: 24, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-26', note: 'קפה', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-26', note: 'Claude Code Tutorial', amount: 64.03, category: 'התפתחות אישית', person: 'משה', essential: false },
  { date: '2025-11-25', note: 'קפה', amount: 9, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-25', note: 'תספורת', amount: 110, category: 'טיפוח', person: 'משה', essential: false },
  { date: '2025-11-24', note: 'קפה ארומה', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-23', note: 'סנדלים', amount: 380, category: 'ביגוד', person: 'משה', essential: false },
  { date: '2025-11-20', note: 'קפה קדוש', amount: 11, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-20', note: 'מתנה לאמא', amount: 225, category: 'מתנות', person: 'משה', essential: false },
  { date: '2025-11-19', note: 'קפה אונ׳', amount: 9, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-18', note: 'Claude Usage', amount: 16.43, category: 'התפתחות אישית', person: 'משה', essential: false },
  { date: '2025-11-16', note: 'אוכל דיאטטי לחתולים', amount: 500, category: 'חתולים', person: 'משה', essential: true },
  { date: '2025-11-13', note: 'קפה', amount: 12, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-12', note: 'קפה אונ׳', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-11', note: 'Todoist', amount: 16.48, category: 'מנויים', person: 'משה', essential: false },
  { date: '2025-11-11', note: 'הקלטה ותמלול', amount: 148.65, category: 'התפתחות אישית', person: 'משה', essential: false },
  { date: '2025-11-11', note: 'דו״ח חנייה', amount: 100, category: 'תחבורה', person: 'משה', essential: false },
  { date: '2025-11-11', note: 'קפה אונ׳', amount: 24, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-08', note: 'ספר מואני', amount: 26.57, category: 'התפתחות אישית', person: 'משה', essential: false },
  { date: '2025-11-07', note: 'בונוס AI', amount: 16.81, category: 'מנויים', person: 'משה', essential: false },
  { date: '2025-11-06', note: 'חניון ספרא', amount: 51, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2025-11-06', note: 'קפה ארומה', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-06', note: 'פלאפל התימני', amount: 29, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-05', note: 'דלק', amount: 242.12, category: 'דלק', person: 'משה', essential: true },
  { date: '2025-11-05', note: 'קפה אונ׳', amount: 9, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-04', note: 'קולנוע', amount: 30, category: 'בילויים', person: 'משה', essential: false },
  { date: '2025-11-03', note: 'iTunes', amount: 43.50, category: 'מנויים', person: 'משה', essential: false },
  { date: '2025-11-03', note: 'אוכל לעבודה', amount: 180, category: 'הוצאות עבודה', person: 'משה', essential: true },
  { date: '2025-11-02', note: 'מנהרות הכרמל', amount: 11.89, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2025-11-01', note: 'קפה ארומה', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2025-11-01', note: 'פרחים לחתמי', amount: 160, category: 'מתנות', person: 'משה', essential: false },

  // מעיין - נובמבר 2025
  { date: '2025-11-29', note: 'Melissa', amount: 50, category: 'מנויים', person: 'מעיין', essential: false },
  { date: '2025-11-26', note: 'גוגל וון', amount: 8, category: 'מנויים', person: 'מעיין', essential: true },
  { date: '2025-11-26', note: 'פנגו', amount: 20, category: 'תחבורה', person: 'מעיין', essential: true },
  { date: '2025-11-25', note: 'מוביט', amount: 238, category: 'תחבורה', person: 'מעיין', essential: true },
  { date: '2025-11-25', note: 'שקיות חימום', amount: 40, category: 'קניות לבית', person: 'מעיין', essential: false },
  { date: '2025-11-24', note: 'קפה', amount: 24, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
  { date: '2025-11-24', note: 'דרכים לדעת', amount: 120, category: 'התפתחות אישית', person: 'מעיין', essential: false },
  { date: '2025-11-19', note: 'מונית', amount: 70, category: 'תחבורה', person: 'מעיין', essential: true },
  { date: '2025-11-18', note: 'תה', amount: 18, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
  { date: '2025-11-17', note: 'מקליט', amount: 470, category: 'קניות לבית', person: 'מעיין', essential: false },
  { date: '2025-11-17', note: 'קניות לבית', amount: 700, category: 'קניות סופר', person: 'מעיין', essential: true },
  { date: '2025-11-15', note: 'מסעדה עם נועה חיפה', amount: 135, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
  { date: '2025-11-11', note: 'מתנה לאמא חלי', amount: 133, category: 'מתנות', person: 'מעיין', essential: false },
  { date: '2025-11-11', note: 'קורס דני נוה', amount: 192, category: 'התפתחות אישית', person: 'מעיין', essential: false },
  { date: '2025-11-11', note: 'דלק', amount: 250, category: 'דלק', person: 'מעיין', essential: true },
  { date: '2025-11-10', note: 'דלק', amount: 225, category: 'דלק', person: 'מעיין', essential: true },
  { date: '2025-11-09', note: 'Structured', amount: 50, category: 'מנויים', person: 'מעיין', essential: false },
  { date: '2025-11-04', note: 'קפה', amount: 30, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
  { date: '2025-11-04', note: 'דורית בר', amount: 2300, category: 'התפתחות אישית', person: 'מעיין', essential: true },
  { date: '2025-11-04', note: 'פיתוח קול', amount: 500, category: 'התפתחות אישית', person: 'מעיין', essential: true },
  { date: '2025-11-02', note: 'זמורה קניות סופר', amount: 550, category: 'קניות סופר', person: 'מעיין', essential: true },
];

const NOVEMBER_INCOME = [
  { date: '2025-11-29', note: 'משכורת קידום נוער', amount: 6019.77, person: 'משה', type: 'משכורת' },
  { date: '2025-11-29', note: 'כסף מאמא', amount: 3000, person: 'מעיין', type: 'מתנה' },
  { date: '2025-11-29', note: 'משכורת', amount: 6800, person: 'מעיין', type: 'משכורת' },
];

const SEPTEMBER_2026_EXPENSES = [
  // משה - ספטמבר 2026
  { date: '2026-09-30', note: 'דו״ח חנייה', amount: 100, category: 'תחבורה', person: 'משה', essential: false },
  { date: '2026-09-30', note: 'גלידה בדרך לצפון', amount: 16.5, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2026-09-29', note: 'מסעדה', amount: 70, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2026-09-29', note: 'משתלה', amount: 620, category: 'קניות לבית', person: 'משה', essential: false },
  { date: '2026-09-29', note: 'מסע חניכה דרכים לדעת', amount: 1250, category: 'התפתחות אישית', person: 'משה', essential: true },
  { date: '2026-09-28', note: 'כביש 6 צפון', amount: 9.59, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2026-09-27', note: 'הוצאות חופשה יוון', amount: 1073, category: 'בילויים', person: 'משה', essential: false },
  { date: '2026-09-27', note: 'ביטוח רכב', amount: 337, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2026-09-26', note: 'ביטוח חובה', amount: 125, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2026-09-25', note: 'moovit', amount: 69.33, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2026-09-25', note: 'סלקום', amount: 154.66, category: 'חשבונות קבועים', person: 'משה', essential: true },
  { date: '2026-09-23', note: 'כללית', amount: 56.65, category: 'בריאות', person: 'משה', essential: true },
  { date: '2026-09-22', note: 'מסיבת רווקים תום', amount: 200, category: 'בילויים', person: 'משה', essential: false },
  { date: '2026-09-22', note: 'קערה לחתמי', amount: 200, category: 'מתנות', person: 'משה', essential: false },
  { date: '2026-09-20', note: 'כביש 6', amount: 135.76, category: 'תחבורה', person: 'משה', essential: true },
  { date: '2026-09-20', note: 'מתנה לחתונה דין', amount: 400, category: 'מתנות', person: 'משה', essential: false },
  { date: '2026-09-18', note: 'דלק', amount: 252.12, category: 'דלק', person: 'משה', essential: true },
  { date: '2026-09-18', note: 'תשלומים של חנות חשמל', amount: 95, category: 'קניות לבית', person: 'משה', essential: false },
  { date: '2026-09-16', note: 'iherb', amount: 497, category: 'קניות סופר', person: 'משה', essential: false },
  { date: '2026-09-15', note: 'סופר פארם', amount: 85.86, category: 'קניות לבית', person: 'משה', essential: true },
  { date: '2026-09-15', note: 'קפה', amount: 12, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2026-09-15', note: 'סופר', amount: 78.58, category: 'קניות סופר', person: 'משה', essential: true },
  { date: '2026-09-14', note: 'משהו בתחנת דלק', amount: 16.9, category: 'אוכל בחוץ', person: 'משה', essential: false },
  { date: '2026-09-14', note: 'דלק', amount: 296.79, category: 'דלק', person: 'משה', essential: true },
  { date: '2026-09-13', note: 'ביטוח טיסה ליוון', amount: 295.04, category: 'בילויים', person: 'משה', essential: false },
  { date: '2026-09-10', note: 'קניות בסופר', amount: 511, category: 'קניות סופר', person: 'משה', essential: true },
  { date: '2026-09-09', note: 'אפליקציה', amount: 29.9, category: 'התפתחות אישית', person: 'משה', essential: false },
  { date: '2026-09-08', note: 'דלק', amount: 257.91, category: 'דלק', person: 'משה', essential: true },
  { date: '2026-09-08', note: 'סופר פארם', amount: 51.7, category: 'קניות לבית', person: 'משה', essential: true },
  { date: '2026-09-06', note: 'אוכל וחול לחתולים', amount: 498, category: 'חתולים', person: 'משה', essential: true },
  { date: '2026-09-05', note: 'מנוי שנתי אובסידיאן', amount: 148.91, category: 'מנויים', person: 'משה', essential: false },
  { date: '2026-09-05', note: 'פופקורן ונאצוס', amount: 61, category: 'בילויים', person: 'משה', essential: false },
  { date: '2026-09-04', note: 'דלק', amount: 283.92, category: 'דלק', person: 'משה', essential: true },
  { date: '2026-09-03', note: 'מסע פטריות עם אבי', amount: 150, category: 'בילויים', person: 'משה', essential: false },
  { date: '2026-09-03', note: 'משהו בתחנת דלק', amount: 24, category: 'בילויים', person: 'משה', essential: false },
  { date: '2026-09-03', note: 'כניסה לחוף הבונים', amount: 48, category: 'בילויים', person: 'משה', essential: false },
  { date: '2026-09-03', note: 'המבורגר אחרי מסע פטריות', amount: 89, category: 'בילויים', person: 'משה', essential: false },
  { date: '2026-09-02', note: 'ספרים ובלוקים ליוגה', amount: 269, category: 'התפתחות אישית', person: 'משה', essential: false },
  { date: '2026-09-01', note: 'יולטה - מחברת למעיין', amount: 69, category: 'קניות לבית', person: 'משה', essential: false },

  // מעיין - ספטמבר 2026
  { date: '2026-09-30', note: 'חשבון חשמל', amount: 156, category: 'חשבונות קבועים', person: 'מעיין', essential: true },
  { date: '2026-09-30', note: 'שייק לי ולמיימי', amount: 62, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
  { date: '2026-09-28', note: 'אכילה בחוץ בדרך לצפון נראה לי', amount: 85, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
  { date: '2026-09-27', note: 'חו״ל', amount: 65, category: 'בילויים', person: 'מעיין', essential: false },
  { date: '2026-09-26', note: 'Google one', amount: 8, category: 'מנויים', person: 'מעיין', essential: true },
  { date: '2026-09-25', note: 'מוביט', amount: 74, category: 'תחבורה', person: 'מעיין', essential: true },
  { date: '2026-09-24', note: 'חו״ל', amount: 18, category: 'בילויים', person: 'מעיין', essential: false },
  { date: '2026-09-23', note: 'חו״ל', amount: 120, category: 'בילויים', person: 'מעיין', essential: false },
  { date: '2026-09-22', note: 'חו״ל', amount: 123, category: 'בילויים', person: 'מעיין', essential: false },
  { date: '2026-09-20', note: 'ESIM', amount: 29, category: 'בילויים', person: 'מעיין', essential: false },
  { date: '2026-09-18', note: 'חניון', amount: 14, category: 'תחבורה', person: 'מעיין', essential: true },
  { date: '2026-09-18', note: 'ניצת הדובדבן', amount: 37, category: 'קניות סופר', person: 'מעיין', essential: true },
  { date: '2026-09-18', note: 'קפה', amount: 17, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
  { date: '2026-09-15', note: 'פיתוח קול', amount: 500, category: 'התפתחות אישית', person: 'מעיין', essential: true },
  { date: '2026-09-15', note: 'קרניו', amount: 250, category: 'בריאות', person: 'מעיין', essential: true },
  { date: '2026-09-10', note: 'שליחת מתנה בדואר לשני', amount: 113, category: 'מתנות', person: 'מעיין', essential: false },
  { date: '2026-09-10', note: 'קורס קול', amount: 1573, category: 'התפתחות אישית', person: 'מעיין', essential: false },
  { date: '2026-09-04', note: 'דורית בר', amount: 140, category: 'התפתחות אישית', person: 'מעיין', essential: true },
  { date: '2026-09-03', note: 'הראל בריאות וחיים', amount: 400, category: 'בריאות', person: 'מעיין', essential: true },
  { date: '2026-09-03', note: 'קרניו', amount: 250, category: 'בריאות', person: 'מעיין', essential: true },
  { date: '2026-09-03', note: 'טיפול פנים', amount: 350, category: 'טיפוח', person: 'מעיין', essential: false },
  { date: '2026-09-02', note: 'כרטיסים לסרט', amount: 60, category: 'בילויים', person: 'מעיין', essential: false },
  { date: '2026-09-02', note: 'ספר', amount: 89, category: 'התפתחות אישית', person: 'מעיין', essential: false },
  { date: '2026-09-02', note: 'תספורת', amount: 150, category: 'טיפוח', person: 'מעיין', essential: false },
  { date: '2026-09-02', note: 'זוהרה', amount: 380, category: 'התפתחות אישית', person: 'מעיין', essential: true },
  { date: '2026-09-01', note: 'שמואל שאול ספר', amount: 160, category: 'מתנות', person: 'מעיין', essential: false },
];

const SEPTEMBER_2026_INCOME = [
  { date: '2026-09-10', note: 'משכורת', amount: 6335, person: 'משה', type: 'משכורת' },
  { date: '2026-09-10', note: 'משכורת', amount: 7200, person: 'מעיין', type: 'משכורת' },
  { date: '2026-09-02', note: 'הראל', amount: 640, person: 'מעיין', type: 'החזר ביטוח' },
  { date: '2026-09-02', note: 'החזר ביטוח', amount: 286, person: 'מעיין', type: 'החזר ביטוח' },
  { date: '2026-09-01', note: 'עזרה מאמא', amount: 1000, person: 'מעיין', type: 'מתנה' },
];

const SEED_BATCHES = [
  { key: '2025-11', expenses: NOVEMBER_EXPENSES, income: NOVEMBER_INCOME },
  { key: '2026-09', expenses: SEPTEMBER_2026_EXPENSES, income: SEPTEMBER_2026_INCOME },
];

// Keys of the batches already loaded into this browser's IndexedDB
const SEEDED_BATCHES_KEY = 'seeded_batches';

export async function seedInitialData() {
  try {
    const seeded = new Set((await settingsDB.getItem(SEEDED_BATCHES_KEY)) || []);

    // Before batches were tracked, November was seeded only into an empty DB.
    // A browser that already holds expenses therefore already has November.
    if (seeded.size === 0 && (await getAllExpenses()).length > 0) {
      seeded.add('2025-11');
      await settingsDB.setItem(SEEDED_BATCHES_KEY, [...seeded]);
    }

    let added = false;
    for (const batch of SEED_BATCHES) {
      if (seeded.has(batch.key)) continue;

      console.log(`Seeding ${batch.key} data...`);
      const importSource = `seed-${batch.key}`;

      for (const expense of batch.expenses) {
        await addExpense({ ...expense, importSource });
      }
      for (const income of batch.income) {
        await addIncome({ ...income, importSource });
      }

      seeded.add(batch.key);
      await settingsDB.setItem(SEEDED_BATCHES_KEY, [...seeded]);
      added = true;
    }

    return added;
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}
