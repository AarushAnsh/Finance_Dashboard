import { useMemo } from 'react';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';

const PIE_COLORS = ['#2563eb', '#0ea5e9', '#14b8a6', '#f97316', '#a855f7', '#ef4444'];

function Charts({ transactions, isLoading = false }) {
  const lineData = useMemo(() => {
    const sortedByDate = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let runningBalance = 0;

    return sortedByDate.map((transaction) => {
      const change =
        transaction.type === 'income' ? transaction.amount : -transaction.amount;
      runningBalance += change;

      return {
        date: transaction.date.slice(5),
        balance: runningBalance,
      };
    });
  }, [transactions]);

  const pieData = useMemo(() => {
    const expenseOnly = transactions.filter((item) => item.type === 'expense');
    const grouped = expenseOnly.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="charts-grid">
        <article className="chart-card skeleton chart-skeleton" />
        <article className="chart-card skeleton chart-skeleton" />
      </div>
    );
  }

  return (
    <div className="charts-grid">
      <article className="chart-card">
        <h3>Balance Over Time</h3>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="chart-card">
        <h3>Where The Money Goes</h3>
        <div className="chart-box">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-visual-state">
              No expense entries yet. Add a few transactions to see the split.
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default Charts;
