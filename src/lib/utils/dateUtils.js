export function getHebrewMonth(month) {
  const hebrewMonths = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];
  return hebrewMonths[month - 1] || '';
}

export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export function formatShortDate(dateString) {
  const [, month, day] = dateString.split('-');
  return `${day}/${month}`;
}

export function getCurrentMonthYear() {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear()
  };
}

export function getMonthKey(year, month) {
  return `${year}-${month.toString().padStart(2, '0')}`;
}
