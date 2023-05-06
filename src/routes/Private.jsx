import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = () => {
  const isAuthenticated = useSelector((state) => state.auth.auth);
  console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default Private;
