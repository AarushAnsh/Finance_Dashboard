export const STORAGE_KEYS = {
  transactions: 'finance_dashboard_transactions',
};

export const USER_ROLES = {
  admin: 'admin',
  viewer: 'viewer',
};

export const TRANSACTION_TYPES = {
  income: 'income',
  expense: 'expense',
  all: 'all',
};

export const DEFAULT_FILTERS = {
  type: TRANSACTION_TYPES.all,
  search: '',
};

export const UI_TIMINGS = {
  dashboardLoadingMs: 1100,
};
