import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function AdminUsers() {
  const { users } = useApp();
  const normalUsers = users.filter((u) => u.role === 'user');

  return (
    <>
      <Navbar variant="admin" />
      <main className="dashboard">
        <h1>👥 Manage Users</h1>
        <p>View all registered users in the Expense Tracker.</p>

        <section className="transactions">
          {normalUsers.length === 0 ? (
            <p>No users registered.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {normalUsers.map((u, idx) => (
                  <tr key={u.id || u.email}>
                    <td>{idx + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
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
