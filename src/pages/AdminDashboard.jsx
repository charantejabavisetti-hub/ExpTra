import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { users, transactions } = useApp();

  const normalUsers = users.filter((u) => u.role === 'user');
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return (
    <>
      <Navbar variant="admin" />
      <main className="dashboard">
        <h1>Admin Dashboard</h1>
        <p>Manage users and monitor expense tracker activities.</p>

        <section className="summary-grid">
          <div className="summary-card">
            <h3>Total Users</h3>
            <p>{normalUsers.length}</p>
          </div>
          <div className="summary-card">
            <h3>Total Transactions</h3>
            <p>{transactions.length}</p>
          </div>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p>₹{totalExpenses.toLocaleString('en-IN')}</p>
          </div>
        </section>

        <section className="module-grid">
          <Link to="/admin-users" className="module-card">
            <h2>👥 Users</h2>
            <p>View registered users.</p>
          </Link>
          <Link to="/admin-transactions" className="module-card">
            <h2>💰 Transactions</h2>
            <p>Monitor user transactions.</p>
          </Link>
          <Link to="/admin-categories" className="module-card">
            <h2>📂 Categories</h2>
            <p>Manage expense categories.</p>
          </Link>
        </section>
      </main>
    </>
  );
}
