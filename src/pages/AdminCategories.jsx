import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory } = useApp();
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    const res = addCategory(name);
    setFeedback(res);
    if (res.ok) setName('');
  };

  return (
    <>
      <Navbar variant="admin" />
      <main className="dashboard">
        <h1>📂 Manage Categories</h1>
        <p>Add and manage expense categories.</p>

        <section className="transactions" style={{ maxWidth: '600px' }}>
          <h2>Add Category</h2>
          <form onSubmit={handleAdd} className="inline-form">
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="dark-btn">
              Add Category
            </button>
          </form>

          {feedback && (
            <p className={feedback.ok ? 'msg-success' : 'msg-error'}>{feedback.message}</p>
          )}

          <h2 style={{ marginTop: '20px' }}>Available Categories</h2>
          {categories.map((cat) => (
            <div key={cat} className="category-item">
              <span>📁 {cat}</span>
              <button onClick={() => deleteCategory(cat)} className="delete-small-btn">
                Remove
              </button>
            </div>
          ))}
        </section>

        <Link to="/admin-dashboard" className="back-link">
          ← Back to Admin Dashboard
        </Link>
      </main>
    </>
  );
}
