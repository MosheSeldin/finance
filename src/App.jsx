import React from 'react';
import { FinanceProvider } from './contexts/FinanceContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  );
}

export default App;
