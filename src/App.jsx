import React from 'react';
import { FinanceProvider } from './contexts/FinanceContext';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <FinanceProvider>
        <Dashboard />
      </FinanceProvider>
    </ErrorBoundary>
  );
}

export default App;
