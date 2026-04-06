import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_FILTERS,
  STORAGE_KEYS,
  TRANSACTION_TYPES,
  USER_ROLES,
} from '../utils/constants';
import { readArrayFromStorage, writeToStorage } from '../utils/localStorage';
import { sampleTransactions } from '../utils/sampleTransactions';

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  // Hydrate once from localStorage, otherwise seed with sample records.
  const [transactions, setTransactions] = useState(() =>
    readArrayFromStorage(STORAGE_KEYS.transactions, sampleTransactions)
  );
  const [role, setRole] = useState(USER_ROLES.viewer);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    writeToStorage(STORAGE_KEYS.transactions, transactions);
  }, [transactions]);

  const addTransaction = (transaction) => {
    // Keep id generation centralized to avoid collisions.
    const nextId = transactions.length
      ? Math.max(...transactions.map((item) => item.id)) + 1
      : 1;

    setTransactions((prev) => [...prev, { ...transaction, id: nextId }]);
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const filteredTransactions = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    // Keep filtering logic in one place so all consumers stay consistent.
    return transactions.filter((transaction) => {
      const typeMatch =
        filters.type === TRANSACTION_TYPES.all
          ? true
          : transaction.type === filters.type;
      const searchMatch = searchTerm
        ? transaction.category.toLowerCase().includes(searchTerm)
        : true;

      return typeMatch && searchMatch;
    });
  }, [transactions, filters]);

  const value = {
    transactions,
    filteredTransactions,
    role,
    filters,
    addTransaction,
    setRole,
    setFilters,
    updateFilter,
    resetFilters,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }

  return context;
}
