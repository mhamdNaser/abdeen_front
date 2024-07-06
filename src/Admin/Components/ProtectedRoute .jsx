import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../provider/ContextsProvider";

const ProtectedRoute = ({ children }) => {
  const { token } = useStateContext({});

  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default ProtectedRoute;
