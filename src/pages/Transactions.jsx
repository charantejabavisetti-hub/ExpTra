import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Transactions() {
  const { userTransactions, deleteTransaction } = useApp();
  const [filterType, setFilterType] = useState('all');

  const filtered = userTransactions.filter((t) =>
    filterType === 'all' ? true : t.type === filterType
  );

  return (
    <>
      <Navbar variant="user" />
      <main className="dashboard">
        <h1>Transactions</h1>
        <p>View your income and expense transactions.</p>

        <section className="transactions">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className="dark-btn"
                style={{
                  backgroundColor: filterType === type ? '#2563eb' : '#e5e7eb',
                  color: filterType === type ? '#fff' : '#222',
                }}
              >
                {type.toUpperCase()}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td>{tx.type}</td>
                    <td>{tx.category}</td>
                    <td>₹{Number(tx.amount).toLocaleString('en-IN')}</td>
                    <td>{tx.description || '-'}</td>
                    <td>
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="delete-small-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <Link to="/user-dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </main>
    </>
  );
}
