import { Grid } from "@mui/material";
import { CartItems, Categories } from "components";

const Home = () => {
  return (
    <Grid item container sx={{ pt: 2, px: { md: 5, xs: 2 } }}>
      <Categories />
      <CartItems />
    </Grid>
  );
};

export default Home;
