import { Grid } from "@mui/material";
import { CartItems, Categories, Error } from "components";
import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useLazyGetProductsQuery,
} from "redux/slices/productSlice";
import { CartItemsSkeleton, CategoriesSkeleton } from "./admin/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "redux/reducers/ProductReducers";

const Home = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const productss = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  const [cat, setCat] = useState("");
  const [getProduct, { isLoading: load, isError: isErr }] =
    useLazyGetProductsQuery();
  useEffect(() => {
    getProduct({
      category: cat,
    }).then((product) => {
      dispatch(getProducts(product.data));
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
      {load ? <CartItemsSkeleton /> : <CartItems products={productss} />}
    </Grid>
  );
};

export default Home;
