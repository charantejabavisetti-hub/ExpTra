import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

const DEFAULT_ADMIN = {
  id: 1,
  name: 'Ravi Kumar',
  email: 'admin@expensetracker.com',
  password: 'admin123',
  role: 'admin',
};

const DEFAULT_CATEGORIES = [
  'Food',
  'Travel',
  'Shopping',
  'Bills',
  'Education',
  'Healthcare',
  'Entertainment',
  'Other',
];

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('users')) || [];
    if (!saved.some((u) => u.role === 'admin')) {
      const updated = [DEFAULT_ADMIN, ...saved];
      localStorage.setItem('users', JSON.stringify(updated));
      return updated;
    }
    return saved;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  });

  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem('transactions')) || [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('categories'));
    if (!saved) {
      localStorage.setItem('categories', JSON.stringify(DEFAULT_CATEGORIES));
      return DEFAULT_CATEGORIES;
    }
    return saved;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const signup = ({ name, email, password }) => {
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user',
    };
    setUsers((prev) => [...prev, newUser]);
    return { ok: true, message: 'Account created successfully!' };
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { ok: false, message: 'Invalid email or password.' };
    }
    setCurrentUser(found);
    return { ok: true, user: found, message: 'Login successful!' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addTransaction = ({ type, amount, category, date, description }) => {
    if (!currentUser) return;
    const newTx = {
      id: Date.now(),
      userEmail: currentUser.email,
      type,
      amount: Number(amount),
      category,
      date,
      description: description || '',
    };
    setTransactions((prev) => [...prev, newTx]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const getUserBudget = () => {
    if (!currentUser) return 0;
    return Number(localStorage.getItem(`budget_${currentUser.email}`)) || 0;
  };

  const setUserBudget = (amount) => {
    if (!currentUser) return;
    localStorage.setItem(`budget_${currentUser.email}`, String(amount));
  };

  const addCategory = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return { ok: false, message: 'Please enter a category.' };
    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      return { ok: false, message: 'Category already exists.' };
    }
    setCategories((prev) => [...prev, trimmed]);
    return { ok: true, message: 'Category added.' };
  };

  const deleteCategory = (name) => {
    setCategories((prev) => prev.filter((c) => c !== name));
  };

  const userTransactions = currentUser
    ? transactions.filter((t) => t.userEmail === currentUser.email)
    : [];

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        transactions,
        userTransactions,
        categories,
        signup,
        login,
        logout,
        addTransaction,
        deleteTransaction,
        getUserBudget,
        setUserBudget,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
