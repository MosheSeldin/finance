import React, { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { useStats } from '../hooks/useStats';
import { useMonthNavigation } from '../hooks/useMonthNavigation';
import { useExpenses } from '../hooks/useExpenses';
import { getHebrewMonth } from '../lib/utils/dateUtils';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../constants/colors';

export default function Dashboard() {
  const { state } = useFinance();
  const stats = useStats();
  const { selectedMonth, selectedYear, goToPrevMonth, goToNextMonth } = useMonthNavigation();
  const { toggleEssential, deleteExpense, updateExpense } = useExpenses();

  const [activeTab, setActiveTab] = useState('overview');
  const [editingId, setEditingId] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">טוען נתונים...</div>
      </div>
    );
  }

  const balance = stats.totalIncome - stats.totalExpenses;

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

  const CategoryExpander = ({ items }) => (
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
          <h1 className="text-3xl font-bold text-white mb-1">
            📊 סיכום פיננסי - {getHebrewMonth(selectedMonth)} {selectedYear}
          </h1>
          <p className="text-purple-300">משה ומעיין</p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={goToPrevMonth}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
          >
            ◀ חודש קודם
          </button>
          <div className="text-xl font-bold text-white">
            {getHebrewMonth(selectedMonth)} {selectedYear}
          </div>
          <button
            onClick={goToNextMonth}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition"
          >
            חודש הבא ▶
          </button>
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
          balance >= 0
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30'
            : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/70 text-sm">יתרה חודשית</div>
              <div className={`text-3xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {balance >= 0 ? '+' : ''}₪{balance.toLocaleString()}
              </div>
            </div>
            <div className="text-6xl">{balance >= 0 ? '📈' : '📉'}</div>
          </div>
        </div>

        {/* Overview Tab - Pie Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">התפלגות לפי קטגוריה</h3>
          <p className="text-white/50 text-sm mb-4">לחץ על קטגוריה לצפייה בפירוט</p>

          <div className="grid md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.byCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {stats.byCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
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
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }} />
                      <span className="text-white">{cat.name}</span>
                      <span className="text-white/40 text-sm">({cat.count})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">₪{cat.value.toLocaleString()}</span>
                      <span className="text-white/50">{expandedCategory === cat.name ? '▼' : '◀'}</span>
                    </div>
                  </button>
                  {expandedCategory === cat.name && <CategoryExpander items={cat.items} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expenses Table */}
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
                {stats.filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (
                  <tr key={expense.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-2">
                      <button onClick={() => toggleEssential(expense.id)} className="text-2xl transition-transform hover:scale-110">
                        {expense.essential ? '✅' : '⭕'}
                      </button>
                    </td>
                    <td className="py-3 px-2 text-white/80 text-sm">{expense.date.slice(5)}</td>
                    <td className="py-3 px-2">
                      {editingId === expense.id ? (
                        <input
                          type="text"
                          value={expense.note}
                          onChange={(e) => updateExpense(expense.id, { note: e.target.value })}
                          className="bg-white/10 rounded px-2 py-1 text-white text-sm w-full"
                        />
                      ) : (
                        <span className="text-white">{expense.note}</span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-white font-medium">₪{expense.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-purple-300 text-sm">{expense.category}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        expense.person === 'משה' ? 'bg-blue-500/20 text-blue-300'
                        : expense.person === 'מעיין' ? 'bg-pink-500/20 text-pink-300'
                        : 'bg-purple-500/20 text-purple-300'
                      }`}>{expense.person}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingId(editingId === expense.id ? null : expense.id)}
                          className={`px-2 py-1 rounded-lg text-sm transition-all ${
                            editingId === expense.id ? 'bg-green-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {editingId === expense.id ? '💾' : '✏️'}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('למחוק את ההוצאה?')) {
                              deleteExpense(expense.id);
                            }
                          }}
                          className="px-2 py-1 rounded-lg text-sm bg-red-500/20 text-red-300 hover:bg-red-500/30"
                        >
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
      </div>
    </div>
  );
}
