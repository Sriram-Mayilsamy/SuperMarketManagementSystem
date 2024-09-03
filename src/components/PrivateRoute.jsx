import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Firebase/AuthContext'; // Assuming you have an AuthContext

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
