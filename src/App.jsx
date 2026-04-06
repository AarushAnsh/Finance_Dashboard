import DashboardPage from './pages/DashboardPage';
import { useEffect, useState } from 'react';
import RoleSwitcher from './components/RoleSwitcher';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const todayLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });

  useEffect(() => {
    document.body.classList.toggle('theme-dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2 className="brand">Northstar Finance</h2>
        <nav className="sidebar-nav">
          <button className="nav-item active" type="button">
            Overview
          </button>
          <button className="nav-item" type="button">
            Cashflow
          </button>
          <button className="nav-item" type="button">
            Reports
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div>
            <h1>Dashboard</h1>
            <p className="header-subtitle">{todayLabel}</p>
          </div>
          <div className="header-actions">
            <RoleSwitcher />
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setIsDarkMode((prev) => !prev)}
            >
              {isDarkMode ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </header>
        <DashboardPage />
      </main>
    </div>
  );
}

export default App;
