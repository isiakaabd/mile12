import { Grid, Skeleton } from "@mui/material";
import { CartItems, Categories, Error } from "components";
import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useLazyGetProductsQuery,
} from "redux/slices/productSlice";

const Products = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [cat, setCat] = useState("tubers");
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

export default Products;
export const CategoriesSkeleton = () => {
  return (
    <Grid item container gap={2}>
      <Skeleton variant="text" width="6rem" height="2rem" />
      <Grid item container flexWrap="nowrap" alignItems={"center"}>
        <Grid item container gap={2}>
          {Array(3)
            .fill(undefined)
            .map((_, idx) => (
              <Skeleton
                variant="rounded"
                width="4rem"
                height="2rem"
                key={idx}
              />
            ))}
        </Grid>
        <Skeleton variant="rounded" width="10rem" height="4rem" />
      </Grid>
    </Grid>
  );
};
export const CartItemsSkeleton = () => {
  return (
    <Grid
      item
      container
      display="grid"
      sx={{ width: "100%" }}
      gridTemplateColumns={{
        sm: "repeat(auto-fill, minmax(25rem, 1fr))",
        xs: "repeat(2,1fr)",
      }}
      mt={5}
      gap={2}
    >
      {Array(12)
        .fill(undefined)
        .map((_, idx) => (
          <Grid item key={idx}>
            <Skeleton variant="rouded" width="100%" height="15rem" key={idx} />
          </Grid>
        ))}
    </Grid>
  );
};
