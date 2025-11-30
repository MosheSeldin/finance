import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function NovemberDashboard() {
  const [expenses, setExpenses] = useState([
    // משה - נובמבר 2025
    { id: 1, date: '2025-11-29', note: 'חניכה מתקדמת', amount: 1250, category: 'התפתחות אישית', person: 'משה', essential: true },
    { id: 2, date: '2025-11-29', note: 'קניות Black Friday', amount: 2321, category: 'קניות לבית', person: 'משה', essential: false },
    { id: 3, date: '2025-11-29', note: 'כללית', amount: 55.74, category: 'בריאות', person: 'משה', essential: true },
    { id: 4, date: '2025-11-29', note: 'Moovit', amount: 169, category: 'תחבורה', person: 'משה', essential: true },
    { id: 5, date: '2025-11-29', note: 'סלקום', amount: 59.78, category: 'חשבונות קבועים', person: 'משה', essential: true },
    { id: 6, date: '2025-11-29', note: 'כביש 6', amount: 4.98, category: 'תחבורה', person: 'משה', essential: true },
    { id: 7, date: '2025-11-28', note: 'השלמת קניות', amount: 85.04, category: 'קניות סופר', person: 'משה', essential: true },
    { id: 8, date: '2025-11-27', note: 'פלאפל', amount: 29, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 9, date: '2025-11-27', note: 'קפה', amount: 9, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 10, date: '2025-11-27', note: 'סנדוויץ טונה', amount: 24, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 11, date: '2025-11-27', note: 'דלק', amount: 253.23, category: 'דלק', person: 'משה', essential: true },
    { id: 12, date: '2025-11-26', note: 'בורקס וקפה', amount: 24, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 13, date: '2025-11-26', note: 'קפה', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 14, date: '2025-11-26', note: 'Claude Code Tutorial', amount: 64.03, category: 'התפתחות אישית', person: 'משה', essential: false },
    { id: 15, date: '2025-11-25', note: 'קפה', amount: 9, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 16, date: '2025-11-25', note: 'תספורת', amount: 110, category: 'טיפוח', person: 'משה', essential: false },
    { id: 17, date: '2025-11-24', note: 'קפה ארומה', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 18, date: '2025-11-23', note: 'סנדלים', amount: 380, category: 'ביגוד', person: 'משה', essential: false },
    { id: 19, date: '2025-11-20', note: 'קפה קדוש', amount: 11, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 20, date: '2025-11-20', note: 'מתנה לאמא', amount: 225, category: 'מתנות', person: 'משה', essential: false },
    { id: 21, date: '2025-11-19', note: 'קפה אונ׳', amount: 9, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 22, date: '2025-11-18', note: 'Claude Usage', amount: 16.43, category: 'התפתחות אישית', person: 'משה', essential: false },
    { id: 23, date: '2025-11-16', note: 'אוכל דיאטטי לחתולים', amount: 500, category: 'חתולים', person: 'משה', essential: true },
    { id: 24, date: '2025-11-13', note: 'קפה', amount: 12, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 25, date: '2025-11-12', note: 'קפה אונ׳', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 26, date: '2025-11-11', note: 'Todoist', amount: 16.48, category: 'מנויים', person: 'משה', essential: false },
    { id: 27, date: '2025-11-11', note: 'הקלטה ותמלול', amount: 148.65, category: 'התפתחות אישית', person: 'משה', essential: false },
    { id: 28, date: '2025-11-11', note: 'דו״ח חנייה', amount: 100, category: 'תחבורה', person: 'משה', essential: false },
    { id: 29, date: '2025-11-11', note: 'קפה אונ׳', amount: 24, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 30, date: '2025-11-08', note: 'ספר מואני', amount: 26.57, category: 'התפתחות אישית', person: 'משה', essential: false },
    { id: 31, date: '2025-11-07', note: 'בונוס AI', amount: 16.81, category: 'מנויים', person: 'משה', essential: false },
    { id: 32, date: '2025-11-06', note: 'חניון ספרא', amount: 51, category: 'תחבורה', person: 'משה', essential: true },
    { id: 33, date: '2025-11-06', note: 'קפה ארומה', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 34, date: '2025-11-06', note: 'פלאפל התימני', amount: 29, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 35, date: '2025-11-05', note: 'דלק', amount: 242.12, category: 'דלק', person: 'משה', essential: true },
    { id: 36, date: '2025-11-05', note: 'קפה אונ׳', amount: 9, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 37, date: '2025-11-04', note: 'קולנוע', amount: 30, category: 'בילויים', person: 'משה', essential: false },
    { id: 38, date: '2025-11-03', note: 'iTunes', amount: 43.50, category: 'מנויים', person: 'משה', essential: false },
    { id: 39, date: '2025-11-03', note: 'אוכל לעבודה', amount: 180, category: 'הוצאות עבודה', person: 'משה', essential: true },
    { id: 40, date: '2025-11-02', note: 'מנהרות הכרמל', amount: 11.89, category: 'תחבורה', person: 'משה', essential: true },
    { id: 41, date: '2025-11-01', note: 'קפה ארומה', amount: 15, category: 'אוכל בחוץ', person: 'משה', essential: false },
    { id: 42, date: '2025-11-01', note: 'פרחים לחתמי', amount: 160, category: 'מתנות', person: 'משה', essential: false },
    
    // מעיין - נובמבר 2025
    { id: 43, date: '2025-11-29', note: 'Melissa', amount: 50, category: 'מנויים', person: 'מעיין', essential: false },
    { id: 44, date: '2025-11-26', note: 'גוגל וון', amount: 8, category: 'מנויים', person: 'מעיין', essential: true },
    { id: 45, date: '2025-11-26', note: 'פנגו', amount: 20, category: 'תחבורה', person: 'מעיין', essential: true },
    { id: 46, date: '2025-11-25', note: 'מוביט', amount: 238, category: 'תחבורה', person: 'מעיין', essential: true },
    { id: 47, date: '2025-11-25', note: 'שקיות חימום', amount: 40, category: 'קניות לבית', person: 'מעיין', essential: false },
    { id: 48, date: '2025-11-24', note: 'קפה', amount: 24, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
    { id: 49, date: '2025-11-24', note: 'דרכים לדעת', amount: 120, category: 'התפתחות אישית', person: 'מעיין', essential: false },
    { id: 50, date: '2025-11-19', note: 'מונית', amount: 70, category: 'תחבורה', person: 'מעיין', essential: true },
    { id: 51, date: '2025-11-18', note: 'תה', amount: 18, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
    { id: 52, date: '2025-11-17', note: 'מקליט', amount: 470, category: 'קניות לבית', person: 'מעיין', essential: false },
    { id: 53, date: '2025-11-17', note: 'קניות לבית', amount: 700, category: 'קניות סופר', person: 'מעיין', essential: true },
    { id: 54, date: '2025-11-15', note: 'מסעדה עם נועה חיפה', amount: 135, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
    { id: 55, date: '2025-11-11', note: 'מתנה לאמא חלי', amount: 133, category: 'מתנות', person: 'מעיין', essential: false },
    { id: 56, date: '2025-11-11', note: 'קורס דני נוה', amount: 192, category: 'התפתחות אישית', person: 'מעיין', essential: false },
    { id: 57, date: '2025-11-11', note: 'דלק', amount: 250, category: 'דלק', person: 'מעיין', essential: true },
    { id: 58, date: '2025-11-10', note: 'דלק', amount: 225, category: 'דלק', person: 'מעיין', essential: true },
    { id: 59, date: '2025-11-09', note: 'Structured', amount: 50, category: 'מנויים', person: 'מעיין', essential: false },
    { id: 61, date: '2025-11-04', note: 'קפה', amount: 30, category: 'אוכל בחוץ', person: 'מעיין', essential: false },
    { id: 62, date: '2025-11-04', note: 'דורית בר', amount: 2300, category: 'התפתחות אישית', person: 'מעיין', essential: true },
    { id: 63, date: '2025-11-04', note: 'פיתוח קול', amount: 500, category: 'התפתחות אישית', person: 'מעיין', essential: true },
    { id: 64, date: '2025-11-02', note: 'זמורה קניות סופר', amount: 550, category: 'קניות סופר', person: 'מעיין', essential: true },
  ]);

  const [income, setIncome] = useState([
    { id: 1, date: '2025-11-29', note: 'משכורת קידום נוער', amount: 6019.77, person: 'משה', type: 'משכורת' },
    { id: 2, date: '2025-11-29', note: 'כסף מאמא', amount: 3000, person: 'מעיין', type: 'מתנה' },
    { id: 3, date: '2025-11-29', note: 'משכורת', amount: 6800, person: 'מעיין', type: 'משכורת' },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [editingId, setEditingId] = useState(null);
  const [filterPerson, setFilterPerson] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedEssential, setExpandedEssential] = useState(null);
  const [expandedNonEssential, setExpandedNonEssential] = useState(null);

  const COLORS = [
    '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', 
    '#ef4444', '#6366f1', '#84cc16', '#f97316', '#14b8a6',
    '#a855f7', '#3b82f6', '#22c55e', '#eab308'
  ];

  const categories = [...new Set(expenses.map(e => e.category))];

  const filteredExpenses = filterPerson === 'all' 
    ? expenses 
    : expenses.filter(e => e.person === filterPerson);

  const filteredIncome = filterPerson === 'all'
    ? income
    : income.filter(i => i.person === filterPerson);

  // Calculate totals
  const stats = useMemo(() => {
    const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = filteredIncome.reduce((sum, i) => sum + i.amount, 0);
    const essential = filteredExpenses.filter(e => e.essential).reduce((sum, e) => sum + e.amount, 0);
    const nonEssential = filteredExpenses.filter(e => !e.essential).reduce((sum, e) => sum + e.amount, 0);
    
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
      totalExpenses, totalIncome, essential, nonEssential, 
      byCategory, byCategoryEssential, byCategoryNonEssential, byPerson,
      coffeeTotal, coffeeCount, foodOutTotal
    };
  }, [expenses, filteredExpenses, filteredIncome, filterPerson]);

  // Budget recommendations based on patterns
  const budgetRecommendations = useMemo(() => {
    const monthlyIncome = stats.totalIncome;
    
    return [
      { category: 'קניות סופר', recommended: Math.round(monthlyIncome * 0.15), current: stats.byCategory.find(c => c.name === 'קניות סופר')?.value || 0, icon: '🛒', priority: 'הכרחי' },
      { category: 'דלק', recommended: Math.round(monthlyIncome * 0.08), current: stats.byCategory.find(c => c.name === 'דלק')?.value || 0, icon: '⛽', priority: 'הכרחי' },
      { category: 'תחבורה', recommended: Math.round(monthlyIncome * 0.05), current: stats.byCategory.find(c => c.name === 'תחבורה')?.value || 0, icon: '🚌', priority: 'הכרחי' },
      { category: 'חשבונות קבועים', recommended: Math.round(monthlyIncome * 0.05), current: stats.byCategory.find(c => c.name === 'חשבונות קבועים')?.value || 0, icon: '📱', priority: 'הכרחי' },
      { category: 'בריאות', recommended: Math.round(monthlyIncome * 0.05), current: stats.byCategory.find(c => c.name === 'בריאות')?.value || 0, icon: '🏥', priority: 'הכרחי' },
      { category: 'חתולים', recommended: Math.round(monthlyIncome * 0.03), current: stats.byCategory.find(c => c.name === 'חתולים')?.value || 0, icon: '🐱', priority: 'הכרחי' },
      { category: 'התפתחות אישית', recommended: Math.round(monthlyIncome * 0.10), current: stats.byCategory.find(c => c.name === 'התפתחות אישית')?.value || 0, icon: '📚', priority: 'השקעה' },
      { category: 'אוכל בחוץ', recommended: Math.round(monthlyIncome * 0.05), current: stats.byCategory.find(c => c.name === 'אוכל בחוץ')?.value || 0, icon: '🍽️', priority: 'גמיש' },
      { category: 'בילויים', recommended: Math.round(monthlyIncome * 0.03), current: stats.byCategory.find(c => c.name === 'בילויים')?.value || 0, icon: '🎬', priority: 'גמיש' },
      { category: 'מתנות', recommended: Math.round(monthlyIncome * 0.03), current: stats.byCategory.find(c => c.name === 'מתנות')?.value || 0, icon: '🎁', priority: 'גמיש' },
      { category: 'ביגוד', recommended: Math.round(monthlyIncome * 0.03), current: stats.byCategory.find(c => c.name === 'ביגוד')?.value || 0, icon: '👕', priority: 'גמיש' },
      { category: 'טיפוח', recommended: Math.round(monthlyIncome * 0.02), current: stats.byCategory.find(c => c.name === 'טיפוח')?.value || 0, icon: '💇', priority: 'גמיש' },
      { category: 'מנויים', recommended: Math.round(monthlyIncome * 0.02), current: stats.byCategory.find(c => c.name === 'מנויים')?.value || 0, icon: '📱', priority: 'גמיש' },
      { category: 'קניות לבית', recommended: Math.round(monthlyIncome * 0.05), current: stats.byCategory.find(c => c.name === 'קניות לבית')?.value || 0, icon: '🏠', priority: 'גמיש' },
      { category: 'חיסכון', recommended: Math.round(monthlyIncome * 0.20), current: stats.totalIncome - stats.totalExpenses, icon: '💰', priority: 'חיסכון' },
    ];
  }, [stats]);

  const toggleEssential = (id) => {
    setExpenses(prev => prev.map(e => 
      e.id === id ? { ...e, essential: !e.essential } : e
    ));
  };

  const updateExpense = (id, field, value) => {
    setExpenses(prev => prev.map(e => 
      e.id === id ? { ...e, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : e
    ));
  };

  const deleteExpense = (id) => {
    if (confirm('למחוק את ההוצאה?')) {
      setExpenses(prev => prev.filter(e => e.id !== id));
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 rounded-lg border border-white/20 shadow-xl">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-purple-300">₪{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const CategoryExpander = ({ category, items }) => (
    <div className="mt-2 bg-white/5 rounded-lg p-3 space-y-2">
      {items.sort((a, b) => b.amount - a.amount).map(item => (
        <div key={item.id} className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${item.person === 'משה' ? 'bg-blue-400' : item.person === 'מעיין' ? 'bg-pink-400' : 'bg-purple-400'}`} />
            <span className="text-white/80">{item.note}</span>
            <span className="text-white/40 text-xs">{item.date.slice(5)}</span>
          </div>
          <span className="text-white/90">₪{item.amount.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">📊 סיכום פיננסי - נובמבר 2025</h1>
          <p className="text-purple-300">משה ומעיין</p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-6">
          {['all', 'משה', 'מעיין', 'משותף'].map(f => (
            <button
              key={f}
              onClick={() => setFilterPerson(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterPerson === f ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {f === 'all' ? '👥 כולם' : f === 'משה' ? '👤 משה' : f === 'מעיין' ? '👤 מעיין' : '🤝 משותף'}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
            <div className="text-green-400 text-sm mb-1">💰 הכנסות</div>
            <div className="text-2xl font-bold text-white">₪{stats.totalIncome.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl p-4 border border-red-500/30">
            <div className="text-red-400 text-sm mb-1">💸 הוצאות</div>
            <div className="text-2xl font-bold text-white">₪{stats.totalExpenses.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-500/30">
            <div className="text-blue-400 text-sm mb-1">✅ הכרחי</div>
            <div className="text-2xl font-bold text-white">₪{stats.essential.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl p-4 border border-orange-500/30">
            <div className="text-orange-400 text-sm mb-1">🎯 לא הכרחי</div>
            <div className="text-2xl font-bold text-white">₪{stats.nonEssential.toLocaleString()}</div>
          </div>
        </div>

        {/* Balance */}
        <div className={`rounded-2xl p-4 mb-6 border ${
          stats.totalIncome - stats.totalExpenses >= 0 
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30'
            : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/70 text-sm">יתרה חודשית</div>
              <div className={`text-3xl font-bold ${stats.totalIncome - stats.totalExpenses >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats.totalIncome - stats.totalExpenses >= 0 ? '+' : ''}₪{(stats.totalIncome - stats.totalExpenses).toLocaleString()}
              </div>
            </div>
            <div className="text-6xl">{stats.totalIncome - stats.totalExpenses >= 0 ? '📈' : '📉'}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: '📊 סקירה' },
            { id: 'income', label: '💰 הכנסות' },
            { id: 'expenses', label: '📝 הוצאות' },
            { id: 'insights', label: '💡 תובנות' },
            { id: 'budget', label: '💼 תקציב' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">התפלגות לפי קטגוריה</h3>
            <p className="text-white/50 text-sm mb-4">לחץ על קטגוריה לצפייה בפירוט</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={stats.byCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                    {stats.byCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {stats.byCategory.map((cat, idx) => (
                  <div key={cat.name}>
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        <span className="text-white">{cat.name}</span>
                        <span className="text-white/40 text-sm">({cat.count})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">₪{cat.value.toLocaleString()}</span>
                        <span className="text-white/50">{expandedCategory === cat.name ? '▼' : '◀'}</span>
                      </div>
                    </button>
                    {expandedCategory === cat.name && <CategoryExpander category={cat.name} items={cat.items} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Income Tab */}
        {activeTab === 'income' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">💰 הכנסות החודש</h3>
            <div className="space-y-4">
              {filteredIncome.map(inc => (
                <div key={inc.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">💵</div>
                    <div>
                      <div className="text-white font-medium">{inc.note}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-white/50">{inc.date}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          inc.person === 'משה' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'
                        }`}>{inc.person}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-300">{inc.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-400">₪{inc.amount.toLocaleString()}</div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-white/5 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">סה״כ הכנסות</span>
                  <span className="text-2xl font-bold text-green-400">₪{stats.totalIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">רשימת הוצאות</h3>
              <div className="text-sm text-white/50">✅/⭕ = הכרחיות | ✏️ = עריכה | 🗑️ = מחיקה</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-right py-3 px-2 text-white/70 text-sm">הכרחי</th>
                    <th className="text-right py-3 px-2 text-white/70 text-sm">תאריך</th>
                    <th className="text-right py-3 px-2 text-white/70 text-sm">תיאור</th>
                    <th className="text-right py-3 px-2 text-white/70 text-sm">סכום</th>
                    <th className="text-right py-3 px-2 text-white/70 text-sm">קטגוריה</th>
                    <th className="text-right py-3 px-2 text-white/70 text-sm">מי</th>
                    <th className="text-right py-3 px-2 text-white/70 text-sm">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
                    <tr key={expense.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-2">
                        <button onClick={() => toggleEssential(expense.id)} className="text-2xl transition-transform hover:scale-110">
                          {expense.essential ? '✅' : '⭕'}
                        </button>
                      </td>
                      <td className="py-3 px-2 text-white/80 text-sm">{expense.date.slice(5)}</td>
                      <td className="py-3 px-2">
                        {editingId === expense.id ? (
                          <input type="text" value={expense.note} onChange={(e) => updateExpense(expense.id, 'note', e.target.value)}
                            className="bg-white/10 rounded px-2 py-1 text-white text-sm w-full" />
                        ) : (
                          <span className="text-white">{expense.note}</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {editingId === expense.id ? (
                          <input type="number" value={expense.amount} onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                            className="bg-white/10 rounded px-2 py-1 text-white text-sm w-20" />
                        ) : (
                          <span className="text-white font-medium">₪{expense.amount.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {editingId === expense.id ? (
                          <select value={expense.category} onChange={(e) => updateExpense(expense.id, 'category', e.target.value)}
                            className="bg-slate-700 rounded px-2 py-1 text-white text-sm">
                            {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                          </select>
                        ) : (
                          <span className="text-purple-300 text-sm">{expense.category}</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {editingId === expense.id ? (
                          <select value={expense.person} onChange={(e) => updateExpense(expense.id, 'person', e.target.value)}
                            className="bg-slate-700 rounded px-2 py-1 text-white text-sm">
                            <option value="משה">משה</option>
                            <option value="מעיין">מעיין</option>
                            <option value="משותף">משותף</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            expense.person === 'משה' ? 'bg-blue-500/20 text-blue-300' 
                            : expense.person === 'מעיין' ? 'bg-pink-500/20 text-pink-300' 
                            : 'bg-purple-500/20 text-purple-300'
                          }`}>{expense.person}</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <button onClick={() => setEditingId(editingId === expense.id ? null : expense.id)}
                            className={`px-2 py-1 rounded-lg text-sm transition-all ${
                              editingId === expense.id ? 'bg-green-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}>
                            {editingId === expense.id ? '💾' : '✏️'}
                          </button>
                          <button onClick={() => deleteExpense(expense.id)}
                            className="px-2 py-1 rounded-lg text-sm bg-red-500/20 text-red-300 hover:bg-red-500/30">
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {/* Essential by Category */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold text-white mb-2">✅ הוצאות הכרחיות לפי קטגוריה</h3>
              <p className="text-white/50 text-sm mb-4">סה״כ: ₪{stats.essential.toLocaleString()} ({((stats.essential / stats.totalExpenses) * 100).toFixed(0)}%)</p>
              <div className="space-y-2">
                {stats.byCategoryEssential.map(cat => (
                  <div key={cat.name}>
                    <button
                      onClick={() => setExpandedEssential(expandedEssential === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white">{cat.name}</span>
                        <span className="text-white/40 text-sm">({cat.count})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-medium">₪{cat.value.toLocaleString()}</span>
                        <span className="text-white/50">{expandedEssential === cat.name ? '▼' : '◀'}</span>
                      </div>
                    </button>
                    {expandedEssential === cat.name && <CategoryExpander category={cat.name} items={cat.items} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Essential by Category */}
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/30">
              <h3 className="text-xl font-bold text-white mb-2">🎯 הוצאות לא הכרחיות לפי קטגוריה</h3>
              <p className="text-white/50 text-sm mb-4">סה״כ: ₪{stats.nonEssential.toLocaleString()} ({((stats.nonEssential / stats.totalExpenses) * 100).toFixed(0)}%)</p>
              <div className="space-y-2">
                {stats.byCategoryNonEssential.map(cat => (
                  <div key={cat.name}>
                    <button
                      onClick={() => setExpandedNonEssential(expandedNonEssential === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white">{cat.name}</span>
                        <span className="text-white/40 text-sm">({cat.count})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-400 font-medium">₪{cat.value.toLocaleString()}</span>
                        <span className="text-white/50">{expandedNonEssential === cat.name ? '▼' : '◀'}</span>
                      </div>
                    </button>
                    {expandedNonEssential === cat.name && <CategoryExpander category={cat.name} items={cat.items} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Insights */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">🎯 תובנות אישיות לחודש הבא</h3>
              
              <div className="space-y-4">
                {/* Coffee insight */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">☕</span>
                    <div>
                      <div className="text-white font-medium">דפוס קפה</div>
                      <div className="text-white/70 text-sm">
                        קניתם קפה {stats.coffeeCount} פעמים בסכום של ₪{stats.coffeeTotal.toLocaleString()}.
                        {stats.coffeeCount > 10 && " זה די הרבה! אולי שווה להביא תרמוס מהבית?"}
                        {stats.coffeeCount <= 10 && stats.coffeeCount > 5 && " סביר, אבל יש מקום לשיפור."}
                      </div>
                      <div className="text-purple-300 text-sm mt-1">
                        💡 המלצה: הגבילו ל-₪100 בחודש על קפה בחוץ
                      </div>
                    </div>
                  </div>
                </div>

                {/* Food out insight */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🍽️</span>
                    <div>
                      <div className="text-white font-medium">אוכל בחוץ</div>
                      <div className="text-white/70 text-sm">
                        הוצאתם ₪{stats.foodOutTotal.toLocaleString()} על אוכל בחוץ.
                        {stats.foodOutTotal > 500 && " זה מעל ל-3% מההכנסה - שווה לשקול הכנת אוכל מהבית."}
                      </div>
                      <div className="text-purple-300 text-sm mt-1">
                        💡 המלצה: תכננו ארוחות מראש והכינו סנדוויצ׳ים לאוניברסיטה
                      </div>
                    </div>
                  </div>
                </div>

                {/* Development insight */}
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <div className="text-white font-medium">התפתחות אישית</div>
                      <div className="text-white/70 text-sm">
                        השקעתם ₪{(stats.byCategory.find(c => c.name === 'התפתחות אישית')?.value || 0).toLocaleString()} בהתפתחות אישית - זה נהדר!
                        ההשקעה הזו בדורית בר, פיתוח קול, וכלי AI תשתלם לטווח ארוך.
                      </div>
                      <div className="text-green-300 text-sm mt-1">
                        ✨ המשיכו כך! זו השקעה בעצמכם
                      </div>
                    </div>
                  </div>
                </div>

                {/* Black Friday insight */}
                {stats.byCategory.find(c => c.name === 'קניות לבית')?.value > 2000 && (
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🛍️</span>
                      <div>
                        <div className="text-white font-medium">קניות חד-פעמיות</div>
                        <div className="text-white/70 text-sm">
                          קניות Black Friday היו גבוהות החודש. בחודש הבא כנראה תוכלו לחסוך בקטגוריה הזו.
                        </div>
                        <div className="text-purple-300 text-sm mt-1">
                          💡 המלצה: הקטינו תקציב קניות לבית בדצמבר ל-₪500
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Savings potential */}
                <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <div className="text-white font-medium">פוטנציאל חיסכון</div>
                      <div className="text-white/70 text-sm">
                        אם תצמצמו 20% מהלא-הכרחי, תחסכו ₪{Math.round(stats.nonEssential * 0.2).toLocaleString()} בחודש.
                      </div>
                      <div className="text-2xl font-bold text-green-400 mt-2">
                        חיסכון שנתי אפשרי: ₪{Math.round(stats.nonEssential * 0.2 * 12).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Tab */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-2">💼 שיטת המעטפות - תקציב לדצמבר 2025</h3>
              <p className="text-white/50 text-sm mb-6">מבוסס על הכנסה של ₪{stats.totalIncome.toLocaleString()}</p>

              {/* Priority Groups */}
              {['הכרחי', 'השקעה', 'גמיש', 'חיסכון'].map(priority => (
                <div key={priority} className="mb-6">
                  <h4 className={`text-lg font-bold mb-3 ${
                    priority === 'הכרחי' ? 'text-green-400' : 
                    priority === 'השקעה' ? 'text-purple-400' : 
                    priority === 'גמיש' ? 'text-orange-400' : 'text-blue-400'
                  }`}>
                    {priority === 'הכרחי' && '🟢 הכרחי'}
                    {priority === 'השקעה' && '🟣 השקעה בעתיד'}
                    {priority === 'גמיש' && '🟠 גמיש'}
                    {priority === 'חיסכון' && '🔵 חיסכון'}
                  </h4>
                  
                  <div className="space-y-3">
                    {budgetRecommendations.filter(b => b.priority === priority).map(budget => {
                      const diff = budget.recommended - budget.current;
                      const percentage = budget.current > 0 ? ((budget.current / budget.recommended) * 100) : 0;
                      
                      return (
                        <div key={budget.category} className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{budget.icon}</span>
                              <span className="text-white font-medium">{budget.category}</span>
                            </div>
                            <div className="text-left">
                              <div className="text-white/50 text-xs">מומלץ</div>
                              <div className="text-white font-bold">₪{budget.recommended.toLocaleString()}</div>
                            </div>
                          </div>
                          
                          <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                percentage > 100 ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-white/50">בפועל: ₪{budget.current.toLocaleString()}</span>
                            <span className={diff >= 0 ? 'text-green-400' : 'text-red-400'}>
                              {diff >= 0 ? `נשאר ₪${diff.toLocaleString()}` : `חרגתם ב-₪${Math.abs(diff).toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4">📋 סיכום התקציב לדצמבר</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-white/50 text-sm">סה״כ מתוקצב</div>
                  <div className="text-2xl font-bold text-white">
                    ₪{budgetRecommendations.filter(b => b.priority !== 'חיסכון').reduce((sum, b) => sum + b.recommended, 0).toLocaleString()}
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-white/50 text-sm">יעד חיסכון</div>
                  <div className="text-2xl font-bold text-green-400">
                    ₪{budgetRecommendations.find(b => b.category === 'חיסכון')?.recommended.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl">
                <div className="text-white font-medium mb-2">💡 טיפים לדצמבר:</div>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• צמצמו קניות לבית - קניתם הרבה בנובמבר</li>
                  <li>• הגבילו קפה בחוץ ל-₪100</li>
                  <li>• שמרו על ההשקעה בהתפתחות אישית</li>
                  <li>• הכינו אוכל מהבית לאוניברסיטה</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
