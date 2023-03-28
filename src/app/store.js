import { configureStore } from "@reduxjs/toolkit";
import ProductReducers from "redux/reducers/ProductReducers";
import authReducer from "redux/reducers/authReducer";
import cartsReducer from "redux/reducers/cartReducer";
import { api } from "redux/slices";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    carts: cartsReducer,
    products: ProductReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
