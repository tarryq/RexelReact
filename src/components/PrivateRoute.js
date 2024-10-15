// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser) {
    return children;
  }

  return <Navigate to="/sign-in-1" />;
};

export default PrivateRoute;
