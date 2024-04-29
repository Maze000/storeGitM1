import React from 'react';
import { Navigate } from 'react-router-dom';
import useToken from './AuthenticateToken2';

const PrivateRoute = ({ children }) => {
  const { token, isTokenExpired } = useToken();
  const isAuthenticated = token && !isTokenExpired;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
