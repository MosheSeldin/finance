import { useFinance } from '../contexts/FinanceContext';

export function useMonthNavigation() {
  const { state, dispatch } = useFinance();
  const { selectedMonth, selectedYear } = state;

  const goToPrevMonth = () => {
    if (selectedMonth === 1) {
      dispatch({
        type: 'SET_MONTH',
        payload: { month: 12, year: selectedYear - 1 }
      });
    } else {
      dispatch({
        type: 'SET_MONTH',
        payload: { month: selectedMonth - 1, year: selectedYear }
      });
    }
  };

  const goToNextMonth = () => {
    if (selectedMonth === 12) {
      dispatch({
        type: 'SET_MONTH',
        payload: { month: 1, year: selectedYear + 1 }
      });
    } else {
      dispatch({
        type: 'SET_MONTH',
        payload: { month: selectedMonth + 1, year: selectedYear }
      });
    }
  };

  const goToToday = () => {
    const today = new Date();
    dispatch({
      type: 'SET_MONTH',
      payload: { month: today.getMonth() + 1, year: today.getFullYear() }
    });
  };

  const setMonth = (month, year) => {
    dispatch({
      type: 'SET_MONTH',
      payload: { month, year }
    });
  };

  return {
    selectedMonth,
    selectedYear,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    setMonth
  };
}
