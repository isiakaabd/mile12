import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import { useSelector } from "react-redux";

const H = () => {
  const { admin } = useSelector((state) => state.auth);

  return (
    <Routes>
      {!admin ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/*" index element={<AdminRoutes />} />
      )}
    </Routes>
  );
};

export default H;
