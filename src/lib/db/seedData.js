import { addExpense, addIncome, getAllExpenses } from './index';

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

export async function seedNovemberData() {
  try {
    // Check if data already exists
    const existing = await getAllExpenses();
    if (existing.length > 0) {
      console.log('Data already exists, skipping seed');
      return false;
    }

    console.log('Seeding November 2025 data...');

    // Import expenses
    for (const expense of NOVEMBER_EXPENSES) {
      await addExpense(expense);
    }

    // Import income
    for (const income of NOVEMBER_INCOME) {
      await addIncome(income);
    }

    console.log('November data seeded successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}
