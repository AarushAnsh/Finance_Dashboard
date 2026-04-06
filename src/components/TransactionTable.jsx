import { useMemo, useState } from 'react';
import { TRANSACTION_TYPES } from '../utils/constants';
import { formatCurrency } from '../utils/formatCurrency';

function TransactionTable({ transactions, isLoading = false }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(TRANSACTION_TYPES.all);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const tableData = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    const filtered = transactions.filter((transaction) => {
      const categoryMatch = transaction.category
        .toLowerCase()
        .includes(searchText);
      const typeMatch =
        typeFilter === TRANSACTION_TYPES.all
          ? true
          : transaction.type === typeFilter;

      return categoryMatch && typeMatch;
    });

    const sorted = [...filtered].sort((a, b) => {
      let result = 0;

      if (sortBy === 'date') {
        result = new Date(a.date) - new Date(b.date);
      } else {
        result = a.amount - b.amount;
      }

      return sortOrder === 'asc' ? result : -result;
    });

    return sorted;
  }, [transactions, search, typeFilter, sortBy, sortOrder]);

  return (
    <>
      <div className="table-controls">
        <input
          className="table-control-input"
          type="text"
          placeholder="Search category (e.g. groceries)"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          className="table-control-select"
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value={TRANSACTION_TYPES.all}>All Types</option>
          <option value={TRANSACTION_TYPES.income}>Income</option>
          <option value={TRANSACTION_TYPES.expense}>Expense</option>
        </select>

        <select
          className="table-control-select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        <select
          className="table-control-select"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th className="text-right">Amount</th>
              <th>Category</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <tr key={`loading-row-${index}`}>
                  <td colSpan={4}>
                    <div className="table-row-skeleton" />
                  </td>
                </tr>
              ))
            ) : tableData.length > 0 ? (
              tableData.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td className="text-right">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td>{transaction.category}</td>
                  <td className="capitalize">{transaction.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <div className="empty-state-card">
                    <p className="empty-state-title">No matching transactions</p>
                    <p className="empty-state-subtitle">
                      Try a different filter, or add a new transaction as admin.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionTable;
