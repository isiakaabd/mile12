import { Grid } from "@mui/material";
import { CartItems, Categories, Error } from "components";
import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useLazyGetProductsQuery,
} from "redux/slices/productSlice";
import { CartItemsSkeleton, CategoriesSkeleton } from "./admin/Products";

const Home = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [cat, setCat] = useState("");
  const [getProducts, { data: products, isLoading: load, isError: isErr }] =
    useLazyGetProductsQuery();
  useEffect(() => {
    getProducts({
      category: cat,
    });
    //eslint-disable-next-line
  }, [cat]);
  if (isErr || isError) return <Error />;
  return (
    <Grid item container>
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <Categories setCat={setCat} categories={categories} />
      )}
      {load ? <CartItemsSkeleton /> : <CartItems products={products} />}
    </Grid>
  );
};

export default Home;
