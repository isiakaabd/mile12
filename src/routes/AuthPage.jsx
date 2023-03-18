import { Outlet, Route, Routes } from "react-router-dom";

import { Grid, Typography } from "@mui/material";
import { ForgottenPassword, Login, Registration, ResetPassword } from "pages";
import { useTheme } from "@emotion/react";

const AuthLayout = () => {
  const theme = useTheme();
  console.log(theme);
  return (
    <Grid item container flexWrap="nowrap">
      <Grid item flex={1}>
        <Outlet />
      </Grid>
      <Grid
        item
        flex={1}
        sx={{
          p: 5,
          background: theme.palette.primary.main,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Grid
          item
          flexDirection="column"
          container
          justifyContent={"center"}
          // alignItems="center"
          sx={{
            px: { xs: 4, md: "40%" },
            py: 8,
            height: "100%",
            background: theme.palette.primary.light,

            border: "1px solid #FFFFFF",
            borderRadius: "1.4rem",
          }}
          gap={3}
        >
          <Typography variant="h1">Search</Typography>
          <Typography variant="h1">Order</Typography>
          <Typography variant="h1">Pay</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgottenPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
