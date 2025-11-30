# 📊 Finance Dashboard - סיכום פיננסי

Personal finance dashboard for tracking expenses and income with Hebrew RTL support.

## Features

✅ **Core Features**
- 💰 Expense and income tracking
- 📊 Interactive charts and visualizations
- 🗓️ Multi-month navigation
- ✅ Essential vs non-essential expense categorization
- 👥 Multi-person tracking (משה ומעיין)
- 📱 Responsive design for mobile and desktop

✅ **Data Management**
- 💾 Persistent storage with IndexedDB
- 📁 14+ pre-defined expense categories
- 🔄 Real-time data updates
- ✏️ Inline editing of expenses
- 🗑️ Delete expenses with confirmation

✅ **Analytics**
- 📈 Spending breakdown by category
- ☕ Pattern analysis (coffee spending, food out, etc.)
- 💡 Insights and recommendations
- 📊 Budget vs actual comparison
- 🎯 Savings potential calculation

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Storage**: IndexedDB (via localforage)
- **State**: React Context + useReducer
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app will be available at `http://localhost:5173/Finance/`

## Project Structure

```
src/
├── components/
│   └── Dashboard.jsx          # Main dashboard component
├── contexts/
│   └── FinanceContext.jsx     # Global state management
├── hooks/
│   ├── useExpenses.js         # Expense operations
│   ├── useIncome.js           # Income operations
│   ├── useStats.js            # Statistics calculations
│   └── useMonthNavigation.js  # Month navigation
├── lib/
│   ├── db/                    # IndexedDB operations
│   │   ├── config.js
│   │   ├── expenses.js
│   │   ├── income.js
│   │   ├── recurring.js
│   │   ├── budgets.js
│   │   ├── categories.js
│   │   ├── settings.js
│   │   └── seedData.js        # Initial data migration
│   └── utils/
│       └── dateUtils.js       # Date formatting utilities
├── constants/
│   └── colors.js              # Chart color palette
└── legacy/
    └── november_dashboard.jsx # Original component reference
```

## Data Schema

### Expenses
- Date, note, amount, category
- Person (משה, מעיין, משותף)
- Essential flag
- Recurring support
- Import source tracking

### Income
- Date, note, amount
- Person
- Type (משכורת, מתנה, etc.)
- Recurring support

### Categories
14 default categories including:
- קניות סופר (Groceries)
- דלק (Fuel)
- תחבורה (Transportation)
- אוכל בחוץ (Eating out)
- בריאות (Health)
- התפתחות אישית (Personal development)
- And more...

## Deployment

The app automatically deploys to GitHub Pages on every push to the main branch via GitHub Actions.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires IndexedDB support (all modern browsers).

## License

Personal use only.

## Credits

Built with ❤️ for משה ומעיין
