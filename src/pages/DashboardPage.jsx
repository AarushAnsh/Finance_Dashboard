import { useEffect, useMemo, useState } from 'react';
import AddTransactionModal from '../components/AddTransactionModal';
import Charts from '../components/Charts';
import InsightsPanel from '../components/InsightsPanel';
import SummaryCard from '../components/SummaryCard';
import TransactionTable from '../components/TransactionTable';
import { useFinance } from '../context/FinanceContext';
import { TRANSACTION_TYPES, UI_TIMINGS, USER_ROLES } from '../utils/constants';
import { formatCurrency } from '../utils/formatCurrency';

function DashboardPage() {
  const { transactions, role, addTransaction } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(
      () => setIsLoading(false),
      UI_TIMINGS.dashboardLoadingMs
    );
    return () => clearTimeout(timerId);
  }, []);

  const metrics = useMemo(() => {
    const totalIncome = transactions
      .filter((item) => item.type === TRANSACTION_TYPES.income)
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = transactions
      .filter((item) => item.type === TRANSACTION_TYPES.expense)
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      totalBalance: totalIncome - totalExpenses,
    };
  }, [transactions]);

  return (
    <section className="dashboard-layout">
      <div className="summary-grid">
        {isLoading ? (
          <>
            <div className="summary-card skeleton" />
            <div className="summary-card skeleton" />
            <div className="summary-card skeleton" />
          </>
        ) : (
          <>
            <SummaryCard
              title="Net Balance"
              value={formatCurrency(metrics.totalBalance)}
            />
            <SummaryCard
              title="Money In"
              value={formatCurrency(metrics.totalIncome)}
            />
            <SummaryCard
              title="Money Out"
              value={formatCurrency(metrics.totalExpenses)}
            />
          </>
        )}
      </div>

      <section className="panel charts-panel">
        <h2>Trends & Breakdown</h2>
        <Charts transactions={transactions} isLoading={isLoading} />
      </section>

      <InsightsPanel transactions={transactions} isLoading={isLoading} />

      <section className="panel">
        <div className="panel-header">
          <h2>Recent Activity</h2>
          {role === USER_ROLES.admin ? (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              New Transaction
            </button>
          ) : null}
        </div>
        <TransactionTable transactions={transactions} isLoading={isLoading} />
      </section>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTransaction}
      />
    </section>
  );
}

export default DashboardPage;
