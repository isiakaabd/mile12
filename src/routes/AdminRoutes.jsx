import { AdminLayout } from "components";
import { Item } from "pages";
import {
  AdminDashboard,
  History,
  Messages,
  Products,
  Order,
  AddProduct,
  EditProduct,
  AdminSingleOrder,
} from "pages/admin";
import { Route, Routes, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="auth/*" element={<Navigate to="/admin" />} />

        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Item />} />
        <Route path="product/add" element={<AddProduct />} />
        <Route path="product/edit" element={<EditProduct />} />
        <Route path="messages" element={<Messages />} />
        <Route path="history" element={<History />} />
        <Route path="history/:id" element={<Order />} />
        <Route path="admin/:id" element={<AdminSingleOrder />} />

        <Route path="admin" index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
