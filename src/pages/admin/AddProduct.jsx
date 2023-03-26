import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Backbutton, TabsComponent } from "./components";

const AddProduct = () => {
  const [value, setValue] = useState(0);

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
