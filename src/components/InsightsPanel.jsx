import { useMemo } from 'react';
import { TRANSACTION_TYPES } from '../utils/constants';
import { formatCurrency } from '../utils/formatCurrency';

function getMonthKey(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function InsightsPanel({ transactions, isLoading = false }) {
  const insights = useMemo(() => {
    const expenses = transactions.filter(
      (item) => item.type === TRANSACTION_TYPES.expense
    );

    const categoryTotals = expenses.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

    const highestCategoryEntry = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const sortedByDate = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const uniqueMonths = [
      ...new Set(sortedByDate.map((item) => getMonthKey(item.date))),
    ];
    const latestMonth = uniqueMonths[uniqueMonths.length - 1];
    const previousMonth = uniqueMonths[uniqueMonths.length - 2];

    const latestMonthExpense = expenses
      .filter((item) => getMonthKey(item.date) === latestMonth)
      .reduce((sum, item) => sum + item.amount, 0);

    const previousMonthExpense = expenses
      .filter((item) => getMonthKey(item.date) === previousMonth)
      .reduce((sum, item) => sum + item.amount, 0);

    const changePercent =
      previousMonthExpense > 0
        ? ((latestMonthExpense - previousMonthExpense) / previousMonthExpense) *
          100
        : 0;

    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
    const topCategoryPercent =
      highestCategoryEntry && totalExpense > 0
        ? (highestCategoryEntry[1] / totalExpense) * 100
        : 0;

    return {
      highestCategory: highestCategoryEntry
        ? `${highestCategoryEntry[0]} (${formatCurrency(highestCategoryEntry[1])})`
        : 'No expense data',
      monthlyComparison: previousMonth
        ? `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(
            1
          )}% vs last month`
        : 'Not enough monthly data',
      observation: highestCategoryEntry
        ? `${highestCategoryEntry[0]} contributes ${topCategoryPercent.toFixed(
            1
          )}% of total expenses`
        : 'Add expenses to unlock insights',
    };
  }, [transactions]);

  return (
    <section className="panel">
      <h2>Insights</h2>
      {isLoading ? (
        <div className="insight-grid">
          <div className="insight-card skeleton" />
          <div className="insight-card skeleton" />
          <div className="insight-card skeleton" />
        </div>
      ) : (
        <div className="insight-grid">
          <article className="insight-card">
            <p className="insight-label">Highest spending category</p>
            <p className="insight-value">{insights.highestCategory}</p>
          </article>
          <article className="insight-card">
            <p className="insight-label">Monthly comparison</p>
            <p className="insight-value">{insights.monthlyComparison}</p>
          </article>
          <article className="insight-card">
            <p className="insight-label">Observation</p>
            <p className="insight-value">{insights.observation}</p>
          </article>
        </div>
      )}
    </section>
  );
}

export default InsightsPanel;
