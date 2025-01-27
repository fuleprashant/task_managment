import React from "react";
import { Navigate } from "react-router-dom";

// This is just a basic authentication check; you can extend this based on your app logic
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Example of checking for an auth token

  if (!isAuthenticated) {
    // Redirect them to the login page if not authenticated
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
