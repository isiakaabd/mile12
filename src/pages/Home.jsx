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
      dispatch(getProducts(product?.data));
    });

    //eslint-disable-next-line
  }, [cat]);
  // const hasNextPage = page + 1 < comments?.total_pages;

  // const [sentryRef] = useInfiniteScroll({
  //   loading: isFetching,
  //   hasNextPage,
  //   onLoadMore: () => setPage((page) => page + 1),
  //   // When there is an error, we stop infinite loading.
  //   // It can be reactivated by setting "error" state as undefined.
  //   disabled: !!error,
  //   rootMargin: "0px 0px 200px 0px",
  // });

  if (isErr || isError) return <Error />;
  return (
    <Grid item container pb={4}>
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
