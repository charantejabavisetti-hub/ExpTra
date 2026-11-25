import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

const INCOME_SOURCES = ['Salary', 'Freelance', 'Business', 'Scholarship', 'Other'];

export default function AddIncome() {
  const { addTransaction } = useApp();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      type: 'income',
      amount: Number(amount),
      category: source,
      date,
      description: description.trim(),
    });
    setMessage('Income added successfully!');
    setTimeout(() => navigate('/user-dashboard'), 700);
  };

  return (
    <>
      <Navbar variant="user" />
      <main className="auth-container">
        <div className="auth-card">
          <h1>Add Income</h1>
          <p className="auth-subtitle">Add your income details below.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="incomeAmount">Amount</label>
              <input
                type="number"
                id="incomeAmount"
                placeholder="Enter amount"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="incomeSource">Income Source</label>
              <select
                id="incomeSource"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
              >
                <option value="">Select income source</option>
                {INCOME_SOURCES.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="incomeDate">Date</label>
              <input
                type="date"
                id="incomeDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="incomeDescription">Description</label>
              <input
                type="text"
                id="incomeDescription"
                placeholder="Example: September salary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-btn">
              Add Income
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
