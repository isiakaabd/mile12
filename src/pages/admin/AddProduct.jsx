import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Backbutton, TabsComponent } from "./components";
import { useLocation } from "react-router-dom";

const AddProduct = (props) => {
  const [value, setValue] = useState(0);
  const slug = useLocation();
  console.log(slug);
  return (
    <Grid item container gap={2} flexDirection={"column"}>
      <Grid item>
        <Backbutton />
      </Grid>
      <Typography variant="h4">New Product</Typography>
      <TabsComponent value={value} setValue={setValue} />
    </Grid>
  );
};

export default AddProduct;
