import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/FakeAuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return isLoggedIn ? children : null;
};
