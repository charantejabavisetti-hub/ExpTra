import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function UserDashboard() {
  const { userTransactions } = useApp();

  const totalIncome = userTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = userTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const recent = [...userTransactions].reverse().slice(0, 5);

  return (
    <>
      <Navbar variant="user" />
      <main className="dashboard">
        <h1>Dashboard</h1>
        <p>Manage your income and expenses from here.</p>

        <section className="summary-grid">
          <div className="summary-card">
            <h3>Total Income</h3>
            <p>₹{totalIncome.toLocaleString('en-IN')}</p>
          </div>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p>₹{totalExpenses.toLocaleString('en-IN')}</p>
          </div>
          <div className="summary-card">
            <h3>Balance</h3>
            <p>₹{balance.toLocaleString('en-IN')}</p>
          </div>
        </section>

        <section className="module-grid">
          <Link to="/add-income" className="module-card">
            <h2>💰 Add Income</h2>
            <p>Add your income details.</p>
          </Link>
          <Link to="/add-expense" className="module-card">
            <h2>💸 Add Expense</h2>
            <p>Record your daily expenses.</p>
          </Link>
          <Link to="/transactions" className="module-card">
            <h2>📋 Transactions</h2>
            <p>View all your transactions.</p>
          </Link>
          <Link to="/budget" className="module-card">
            <h2>🎯 Budget</h2>
            <p>Manage your monthly budget.</p>
          </Link>
          <Link to="/reports" className="module-card">
            <h2>📊 Reports</h2>
            <p>View your spending reports.</p>
          </Link>
        </section>

        <section className="transactions">
          <h2>Recent Transactions</h2>
          {recent.length === 0 ? (
            <p>No transactions available.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td>{tx.type}</td>
                    <td>{tx.category}</td>
                    <td>₹{Number(tx.amount).toLocaleString('en-IN')}</td>
                    <td>{tx.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  );
}
