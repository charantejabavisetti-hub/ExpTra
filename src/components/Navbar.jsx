import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar({ variant = 'public' }) {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (variant === 'admin') {
    return (
      <header className="navbar admin-nav">
        <Link to="/admin-dashboard" className="logo">
          Expense Tracker - Admin
        </Link>
        <nav>
          {currentUser && <span className="welcome-text">Welcome, {currentUser.name}</span>}
          <Link to="/admin-dashboard">Dashboard</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>
    );
  }

  if (variant === 'user') {
    return (
      <header className="navbar">
        <Link to="/user-dashboard" className="logo">
          Expense Tracker
        </Link>
        <nav>
          {currentUser && <span className="welcome-text">Welcome, {currentUser.name}</span>}
          <Link to="/user-dashboard">Dashboard</Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>
    );
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Expense Tracker
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
  );
}
