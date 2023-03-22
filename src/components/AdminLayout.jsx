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
<<<<<<< HEAD
      <Box sx={{ width: "100%", p: 3 }}>
=======
      <Box>
>>>>>>> 58db58da0214e45bb5bb14649c394a72f6502b31
        <Toolbar />
        <Outlet />
      </Box>
    </Grid>
  );
};

export default AdminLayout;
