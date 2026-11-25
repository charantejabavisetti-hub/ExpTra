import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function AddExpense() {
  const { categories, addTransaction } = useApp();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      type: 'expense',
      amount: Number(amount),
      category,
      date,
      description: description.trim(),
    });
    setMessage('Expense added successfully!');
    setTimeout(() => navigate('/user-dashboard'), 700);
  };

  return (
    <>
      <Navbar variant="user" />
      <main className="auth-container">
        <div className="auth-card">
          <h1>Add Expense</h1>
          <p className="auth-subtitle">Record your expense details below.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="expenseAmount">Amount</label>
              <input
                type="number"
                id="expenseAmount"
                placeholder="Enter amount"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expenseCategory">Expense Category</label>
              <select
                id="expenseCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="expenseDate">Date</label>
              <input
                type="date"
                id="expenseDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expenseDescription">Description</label>
              <input
                type="text"
                id="expenseDescription"
                placeholder="Example: Monthly grocery shopping"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-btn">
              Add Expense
            </button>

            {message && <p className="msg-success">{message}</p>}
          </form>

          <p className="auth-footer">
            <Link to="/user-dashboard">← Back to Dashboard</Link>
          </p>
        </div>
      </main>
    </>
  );
}
