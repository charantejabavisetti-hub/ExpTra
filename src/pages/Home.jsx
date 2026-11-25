import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar variant="public" />

      <main className="hero">
        <div className="hero-content">
          <h1>Manage Your Money Smartly</h1>
          <p>
            Track your income and expenses, manage your budget, and understand
            your spending habits easily.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn primary-btn">
              Login
            </Link>
            <Link to="/signup" className="btn secondary-btn">
              Create Account
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Monthly Overview</h2>
          <div className="overview-item">
            <span>Total Income</span>
            <strong>₹30,000</strong>
          </div>
          <div className="overview-item">
            <span>Total Expenses</span>
            <strong>₹16,000</strong>
          </div>
          <div className="overview-item">
            <span>Balance</span>
            <strong>₹14,000</strong>
          </div>
        </div>
      </main>

      <section className="features">
        <h2>Why Use Expense Tracker?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>💰 Track Expenses</h3>
            <p>Record and manage your daily expenses easily.</p>
          </div>
          <div className="feature-card">
            <h3>📊 View Reports</h3>
            <p>Understand your spending through reports and charts.</p>
          </div>
          <div className="feature-card">
            <h3>🎯 Manage Budget</h3>
            <p>Set budgets and control unnecessary spending.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Expense Tracker | SDC Project</p>
      </footer>
    </>
  );
}
