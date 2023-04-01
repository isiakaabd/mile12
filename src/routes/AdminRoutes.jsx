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
  Contact,
} from "pages/admin";
import { Route, Routes } from "react-router-dom";
import UnRegisterRoute from "./UnRegisterRoute";
import { AuthPage } from "./AuthPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Item />} />
        <Route path="product/add" element={<AddProduct />} />
        <Route path="product/edit" element={<EditProduct />} />
        <Route path="messages" element={<Messages />} />
        <Route path="history" element={<History />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="history/:id" element={<Order />} />
        <Route path="dashboard/:id" element={<AdminSingleOrder />} />

        <Route path="/dashboard" index element={<AdminDashboard />} />
      </Route>
      <Route path="/*" element={<UnRegisterRoute />} />
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
};

export default AdminRoutes;
