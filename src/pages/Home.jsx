import { Grid } from "@mui/material";
import { CartItems, Categories } from "components";

const Home = () => {
  return (
    <Grid item container>
      <Categories />
      <CartItems />
    </Grid>
  );
};

export default Home;
