import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function AdminTransactions() {
  const { transactions } = useApp();

  return (
    <>
      <Navbar variant="admin" />
      <main className="dashboard">
        <h1>💰 All Transactions</h1>
        <p>Monitor all income and expense transactions.</p>

        <section className="transactions">
          {transactions.length === 0 ? (
            <p>No transactions available.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User Email</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr key={tx.id}>
                    <td>{idx + 1}</td>
                    <td>{tx.userEmail || '-'}</td>
                    <td>{tx.date || '-'}</td>
                    <td>{tx.type || '-'}</td>
                    <td>{tx.category || tx.source || '-'}</td>
                    <td>₹{Number(tx.amount || 0).toLocaleString('en-IN')}</td>
                    <td>{tx.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <Link to="/admin-dashboard" className="back-link">
          ← Back to Admin Dashboard
        </Link>
      </main>
    </>
  );
}
