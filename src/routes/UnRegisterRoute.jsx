import MiniDrawer from "components/MiniDrawer";
import { CartsList, Home, Item } from "pages";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./AuthPage";

const UnRegisterRoute = () => {
  return (
    <Routes>
      <Route element={<MiniDrawer />}>
        <Route path="dashboard" element={<Home />} />
        <Route path="products/:id" element={<Item />} />
        <Route path="carts" element={<CartsList />} />

        <Route index element={<Home />} />
      </Route>
      <Route path="auth/*" element={<AuthPage />} />
    </Routes>
  );
};

export default UnRegisterRoute;
