import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@hooks/useMyContext";
import React from "react";
import { LinearProgress } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { token, getCookie, handleAuthentication, loading, setLoading } = useAuth();
  const location = useLocation();
  // cont;
  const auth = getCookie("academy");

  if ((!token && auth == undefined) || auth == null) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  React.useEffect(() => {
    if (auth == null || auth == undefined || token != null) return;
    handleAuthentication();
  }, [auth]);

  if (loading) {
    return <LinearProgress />;
  }

  return children;

  //
};
export default ProtectedRoute;
