import MiniDrawer from "components/MiniDrawer";
import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />

        {/* <Route path="*" element={<Navigate to="/error/404" />} /> */}
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
