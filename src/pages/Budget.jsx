import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Budget() {
  const { userTransactions, getUserBudget, setUserBudget } = useApp();
  const [monthlyBudget, setMonthlyBudget] = useState(() => getUserBudget());
  const [inputAmount, setInputAmount] = useState('');
  const [message, setMessage] = useState('');

  const totalExpenses = userTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const remainingBudget = monthlyBudget - totalExpenses;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(inputAmount);
    if (amount <= 0) {
      setMessage('Please enter a valid budget amount.');
      return;
    }
    setUserBudget(amount);
    setMonthlyBudget(amount);
    setMessage('Budget set successfully!');
    setInputAmount('');
  };

  let statusText = 'No budget set yet.';
  if (monthlyBudget > 0 && remainingBudget < 0) {
    statusText = `⚠️ Budget exceeded by ₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`;
  } else if (monthlyBudget > 0) {
    statusText = `✅ You have ₹${remainingBudget.toLocaleString('en-IN')} remaining.`;
  }

  return (
    <>
      <Navbar variant="user" />
      <main className="dashboard">
        <h1>Monthly Budget</h1>
        <p>Set and manage your monthly spending budget.</p>

        <section className="transactions">
          <h2>Set Budget</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="budgetAmount">Monthly Budget Amount</label>
              <input
                type="number"
                id="budgetAmount"
                placeholder="Enter budget amount"
                min="1"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn">
              Set Budget
            </button>
            {message && <p className="msg-success">{message}</p>}
          </form>
        </section>

        <section className="summary-grid">
          <div className="summary-card">
            <h3>Monthly Budget</h3>
            <p>₹{monthlyBudget.toLocaleString('en-IN')}</p>
          </div>
          <div className="summary-card">
            <h3>Total Expenses</h3>
            <p>₹{totalExpenses.toLocaleString('en-IN')}</p>
          </div>
          <div className="summary-card">
            <h3>Remaining Budget</h3>
            <p>₹{remainingBudget.toLocaleString('en-IN')}</p>
          </div>
        </section>

        <section className="transactions">
          <p>{statusText}</p>
        </section>

        <Link to="/user-dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </main>
    </>
  );
}
