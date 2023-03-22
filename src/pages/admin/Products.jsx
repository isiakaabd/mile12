import { Grid } from "@mui/material";
import { CartItems, Categories } from "components";

const Products = () => {
  return (
    <Grid item container>
      <Categories />
      <CartItems />
    </Grid>
  );
};

export default Products;
