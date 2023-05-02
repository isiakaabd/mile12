import { ThemeProvider } from "@emotion/react";
import App from "App";
import { muiTheme } from "muiTheme";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import UnRegisterRoute from "./UnRegisterRoute";
import { Socials } from "pages";

const AppRoutes = () => {
  const { admin, token } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route element={<App />}>
              {token && !admin ? (
                <>
                  <Route path="/*" index element={<PrivateRoutes />} />
                  {/* <Route index element={<Navigate to="/dashboard" />} /> */}
                </>
              ) : token && admin ? (
                <>
                  <Route path="/*" index element={<AdminRoutes />} />
                  {/* <Route  element={<AdminDashboard />} /> */}
                </>
              ) : (
                <>
                  <Route path="/*" index element={<UnRegisterRoute />} />
                  {/* <Route path="*" element={<Unknown />} /> */}
                </>
              )}
              <Route path="/auth/social" element={<Socials />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRoutes;
