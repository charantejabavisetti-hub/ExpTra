import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return (
      <Navigate
        to={currentUser.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}
        replace
      />
    );
  }

  return children;
}
