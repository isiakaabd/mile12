import MiniDrawer from "components/MiniDrawer";
import {
  CartsList,
  Home,
  MyOrders,
  SingleOrder,
  Checkout,
  Item,
  Status,
} from "pages";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./AuthPage";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="dashboard" element={<Home />} />
        <Route path="products/:id" element={<Item />} />
        <Route path="carts" element={<CartsList />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="my-orders/:id" element={<SingleOrder />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order/checkout" element={<>ddd</>} />
        <Route path="order/verify" element={<Status />} />
        {/* <Route path="admin" element={<AdminDashboard />} /> */}
        <Route index element={<Home />} />
        {/* <Route path="*" element={<Navigate to="/error/404" />} /> */}
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
};

export default PrivateRoutes;
