import MiniDrawer from "components/MiniDrawer";
import {
  CartsList,
  Home,
  MyOrders,
  SingleOrder,
  Checkout,
  Item,
  Status,
  Page404,
} from "pages";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./AuthPage";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="dashboard" index element={<Home />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="my-orders/:id" element={<SingleOrder />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order/verify" element={<Status />} />
        <Route path="products/:id" element={<Item />} />
        <Route path="carts" element={<CartsList />} />
        <Route path="*" element={<Page404 />} />
      </Route>

      {/* <Route path="admin" element={<AdminDashboard />} /> */}
      <Route path="dashboard" index element={<Home />} />

      <Route path="auth/*" element={<AuthPage />} />
      {/* <Route path="*" element={<Home />} /> */}
    </Routes>
  );
};

export default PrivateRoutes;
