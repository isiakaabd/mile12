import { Grid } from "@mui/material";
import "./App.css";
import { Outlet } from "react-router-dom";

import { Suspense } from "react";
function App() {
  return (
    <Grid item container height={"100%"}>
      <Suspense>
        <Outlet />
      </Suspense>
    </Grid>
  );
}

export default App;
