import { AdminLayout } from "components";
import { AdminDashboard } from "pages";
import { History, Messages, Products } from "pages/admin";
import { Route, Routes, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="auth/*" element={<Navigate to="/admin" />} />

        <Route path="products" element={<Products />} />
        <Route path="messages" element={<Messages />} />
        <Route path="history" element={<History />} />
        <Route path="admin" index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
