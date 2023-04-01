import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Avatar, Grid, Typography } from "@mui/material";
import { ForgottenPassword, Login, Registration, ResetPassword } from "pages";
import { g, logo } from "assets/images";

const AuthLayout = () => {
  return (
    <Grid item container flexWrap="nowrap" height={"100vh"}>
      <Grid item flex={1}>
        <Grid
          item
          md={10}
          xs={12}
          sx={{ p: 5, pt: 2, margin: "auto", height: "100%" }}
        >
          <Grid
            item
            container
            gap={2}
            flexDirection={"column"}
            flexWrap="nowrap"
            sx={{ height: "100%", justifyContent: "center" }}
          >
            <Grid item>
              <Avatar
                component={Link}
                src={logo}
                to={"/"}
                alt="MILE 12"
                title="MILE 12"
              />
            </Grid>

            <Outlet />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        flex={1}
        sx={{
          p: 5,
          background: `url(${g}) no-repeat  center center`,
          backgroundSize: "cover",
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
            px: { xs: 4, md: "10rem" },
            py: 4,
            height: "100%",
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid #FFFFFF",
            backdropFilter: "blur(13.5px)",

            borderRadius: "1.4rem",
          }}
          gap={3}
        >
          <Typography variant="h1">Search</Typography>
          <Typography variant="h1">Order</Typography>
          <Typography variant="h1">Pay</Typography>
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontWeight: 400, fontSize: "2rem" }}
          >
            Free delivery for orders above $149.99
          </Typography>
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
