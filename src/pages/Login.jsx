import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email.trim(), password);
    setStatus(res);
    if (res.ok) {
      setTimeout(() => {
        navigate(res.user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
      }, 700);
    }
  };

  return (
    <>
      <Navbar variant="public" />
      <main className="auth-container">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Login to manage your expenses.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input
                type="email"
                id="loginEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              Login
            </button>

            {status && (
              <p className={status.ok ? 'msg-success' : 'msg-error'}>{status.message}</p>
            )}
          </form>

          <div className="demo-hint">
            Default Admin: <strong>admin@expensetracker.com</strong> / <strong>admin123</strong>
          </div>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </main>
    </>
  );
}
