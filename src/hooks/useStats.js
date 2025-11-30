import { useMemo } from 'react';
import { useFinance } from '../contexts/FinanceContext';

export function useStats() {
  const { state } = useFinance();
  const { expenses, income, filterPerson } = state;

  const filteredExpenses = useMemo(() => {
    return filterPerson === 'all'
      ? expenses
      : expenses.filter(e => e.person === filterPerson);
  }, [expenses, filterPerson]);

  const filteredIncome = useMemo(() => {
    return filterPerson === 'all'
      ? income
      : income.filter(i => i.person === filterPerson);
  }, [income, filterPerson]);

  const stats = useMemo(() => {
    const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = filteredIncome.reduce((sum, i) => sum + i.amount, 0);
    const essential = filteredExpenses.filter(e => e.essential).reduce((sum, e) => sum + e.amount, 0);
    const nonEssential = filteredExpenses.filter(e => !e.essential).reduce((sum, e) => sum + e.amount, 0);

    // Get unique categories
    const categories = [...new Set(filteredExpenses.map(e => e.category))];

    const byCategory = categories.map(cat => ({
      name: cat,
      value: filteredExpenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0),
      count: filteredExpenses.filter(e => e.category === cat).length,
      items: filteredExpenses.filter(e => e.category === cat)
    })).filter(c => c.value > 0).sort((a, b) => b.value - a.value);

    const byCategoryEssential = categories.map(cat => ({
      name: cat,
      value: filteredExpenses.filter(e => e.category === cat && e.essential).reduce((sum, e) => sum + e.amount, 0),
      count: filteredExpenses.filter(e => e.category === cat && e.essential).length,
      items: filteredExpenses.filter(e => e.category === cat && e.essential)
    })).filter(c => c.value > 0).sort((a, b) => b.value - a.value);

    const byCategoryNonEssential = categories.map(cat => ({
      name: cat,
      value: filteredExpenses.filter(e => e.category === cat && !e.essential).reduce((sum, e) => sum + e.amount, 0),
      count: filteredExpenses.filter(e => e.category === cat && !e.essential).length,
      items: filteredExpenses.filter(e => e.category === cat && !e.essential)
    })).filter(c => c.value > 0).sort((a, b) => b.value - a.value);

    const byPerson = ['משה', 'מעיין', 'משותף'].map(person => ({
      name: person,
      value: expenses.filter(e => e.person === person).reduce((sum, e) => sum + e.amount, 0)
    }));

    // Pattern analysis
    const coffeeExpenses = filteredExpenses.filter(e =>
      e.note.includes('קפה') || e.note.includes('ארומה') || e.note.includes('קדוש')
    );
    const coffeeTotal = coffeeExpenses.reduce((sum, e) => sum + e.amount, 0);
    const coffeeCount = coffeeExpenses.length;

    const foodOutExpenses = filteredExpenses.filter(e => e.category === 'אוכל בחוץ');
    const foodOutTotal = foodOutExpenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      totalExpenses,
      totalIncome,
      essential,
      nonEssential,
      byCategory,
      byCategoryEssential,
      byCategoryNonEssential,
      byPerson,
      coffeeTotal,
      coffeeCount,
      foodOutTotal
    };
  }, [filteredExpenses, filteredIncome, expenses]);

  return {
    ...stats,
    filteredExpenses,
    filteredIncome
  };
}
