import { Grid, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { Backbutton, TabsComponent } from "./components";
import { useLocation } from "react-router-dom";
import { useGetProductQuery } from "redux/slices/productSlice";
import { Error } from "@mui/icons-material";

const EditProduct = () => {
  const [value, setValue] = useState(0);
  const { state } = useLocation();
  const { data: product, isLoading, isError } = useGetProductQuery(state);
  if (isLoading) return <Skeleton />;
  if (isError) return <Error />;
  return (
    <Grid item container gap={2} flexDirection={"column"}>
      <Grid item>
        <Backbutton />
      </Grid>
      <Typography variant="h4">Edit Product</Typography>
      <TabsComponent
        value={value}
        setValue={setValue}
        product={product}
        type="edit"
      />
    </Grid>
  );
};

export default EditProduct;
