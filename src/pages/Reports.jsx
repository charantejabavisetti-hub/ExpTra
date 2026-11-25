import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Reports() {
  const { userTransactions } = useApp();

  let totalIncome = 0;
  let totalExpenses = 0;
  const categoryTotals = {};

  userTransactions.forEach((tx) => {
    const amt = Number(tx.amount);
    if (tx.type === 'income') {
      totalIncome += amt;
    } else if (tx.type === 'expense') {
      totalExpenses += amt;
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + amt;
    }
  });

  const balance = totalIncome - totalExpenses;
  const categoryEntries = Object.entries(categoryTotals);

  return (
    <>
      <Navbar variant="user" />
      <main className="dashboard">
        <h1>📊 Expense Reports</h1>
        <p>View your income, expenses and spending categories.</p>

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

        <section className="transactions">
          <h2>Expense Categories</h2>
          {categoryEntries.length === 0 ? (
            <p>No expense data available.</p>
          ) : (
            categoryEntries.map(([cat, amt]) => (
              <div key={cat} className="category-row">
                <strong>{cat}</strong>
                <span>₹{amt.toLocaleString('en-IN')}</span>
              </div>
            ))
          )}
        </section>

        <Link to="/user-dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </main>
    </>
  );
}
