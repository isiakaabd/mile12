import MiniDrawer from "components/MiniDrawer";
import {
  CartsList,
  Home,
  MyOrders,
  AdminDashboard,
  SingleOrder,
  Checkout,
} from "pages";
import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="carts" element={<CartsList />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="my-orders/:id" element={<SingleOrder />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route index element={<Home />} />
        {/* <Route path="*" element={<Navigate to="/error/404" />} /> */}
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
