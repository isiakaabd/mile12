import { configureStore } from "@reduxjs/toolkit";
import ProductReducers from "redux/reducers/ProductReducers";
import authReducer from "redux/reducers/authReducer";
import cartsReducer from "redux/reducers/cartReducer";
import apiSlice from "redux/slices";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    carts: cartsReducer,
    products: ProductReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
