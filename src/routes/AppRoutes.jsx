import { ThemeProvider } from "@emotion/react";
import App from "App";
import { muiTheme } from "muiTheme";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import UnRegisterRoute from "./UnRegisterRoute";
import H from "./H";
import { AuthPage } from "./AuthPage";
import { Socials } from "pages";

const AppRoutes = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route element={<App />}>
              {token ? (
                <>
                  <Route index path="/*" element={<H />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                <>
                  <Route path="/home/*" index element={<UnRegisterRoute />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </>
              )}
              <Route path="/auth/social" element={<Socials />} />
              <Route path="auth/*" element={<AuthPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRoutes;
