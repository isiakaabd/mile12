import MiniDrawer from "components/MiniDrawer";
import { Home } from "pages";
import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route index element={<Home />} />
        {/* <Route path="*" element={<Navigate to="/error/404" />} /> */}
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
