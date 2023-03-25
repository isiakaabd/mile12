import { Grid, Skeleton } from "@mui/material";
import { CartItems, Categories, Error } from "components";
import { useState } from "react";
import { useGetCategoriesQuery } from "redux/slices/productSlice";

const Home = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [cat, setCat] = useState("");
  if (isLoading) return <Skeleton />;
  if (isError) return <Error />;
  return (
    <Grid item container>
      <Categories setCat={setCat} categories={categories} />
      <CartItems cat={cat} />
    </Grid>
  );
};

export default Home;
