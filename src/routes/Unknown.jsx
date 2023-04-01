import { Navigate, useLocation } from "react-router-dom";

const Unknown = ({ to }) => {
  const prev = useLocation();
  return <Navigate to={to} state={{ prev }} replace />;
};

export default Unknown;
