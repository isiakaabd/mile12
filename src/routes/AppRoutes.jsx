import { ThemeProvider } from "@emotion/react";
import App from "App";
import { muiTheme } from "muiTheme";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import { AuthPage } from "./AuthPage";

const AppRoutes = () => {
  const loginStatus = useSelector((state) => state.auth.auth);
  const admin = false;
  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route element={<App />}>
              {/* <Route path="error/*" element={<ErrorsPage />} /> */}
              {/* <Route path="logout" element={<Logout />} /> */}
              {loginStatus && !admin ? (
                <>
                  <Route path="/*" element={<PrivateRoutes />} />
                  <Route index element={<Navigate to="/dashboard" />} />
                </>
              ) : loginStatus && admin ? (
                <>
                  <Route path="/*" element={<AdminRoutes />} />
                  <Route index element={<Navigate to="/admin" />} />
                </>
              ) : (
                <>
                  <Route path="auth/*" element={<AuthPage />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </>
              )}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRoutes;
