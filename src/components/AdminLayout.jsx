import { Box, Grid, Toolbar } from "@mui/material";
import Drawers from "./Drawer";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const xsDrawerWidth = 60;
  return (
    <Grid item container flexWrap="nowrap">
      <Grid item>
        <Drawers />
      </Grid>
      <Grid item>
        <AdminHeader />
      </Grid>
      <Box
        sx={{
          width: { xs: `calc(100% - ${xsDrawerWidth}px) `, md: "100%" },
          p: { sm: 3, xs: 2 },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Grid>
  );
};

export default AdminLayout;
