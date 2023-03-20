import { Box, Grid, Toolbar } from "@mui/material";
import Drawers from "./Drawer";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <Grid item container flexWrap="nowrap">
      <Grid item>
        <Drawers />
      </Grid>
      <Grid item>
        <AdminHeader />
      </Grid>
      <Box>
        <Toolbar />
        <Outlet />
      </Box>
    </Grid>
  );
};

export default AdminLayout;
