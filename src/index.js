import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import AppRoutes from "routes/AppRoutes";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <CssBaseline />
    <AppRoutes />
    <ToastContainer
      style={{ fontSize: "1.8rem" }}
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </Provider>
  // </React.StrictMode>
);

serviceWorkerRegistration.register();
