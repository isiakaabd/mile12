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
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const productss = useSelector((state) => state.products?.products);

  const dispatch = useDispatch();
  const [cat, setCat] = useState("");
  const [getProduct, { isLoading: load, error: isErr, data }] =
    useLazyGetProductsQuery();
  useEffect(() => {
    async function fetchData() {
      try {
        await getProduct({
          category: cat,
        });
        if (data) {
          dispatch(getProducts(data));
        }
      } catch (e) {
        console.log(e);
      }
    }
    // .then((product) => {
    //       dispatch(getProducts(product?.data));
    //     });
    fetchData();
    //eslint-disable-next-line
  }, [cat, data]);
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

  return (
    <Grid item container pb={4}>
      {isLoading ? (
        <CategoriesSkeleton />
      ) : error ? (
        <Error />
      ) : (
        <Categories setCat={setCat} categories={categories} />
      )}
      {load ? (
        <CartItemsSkeleton />
      ) : isErr ? (
        <Error />
      ) : (
        <CartItems products={productss} />
      )}
    </Grid>
  );
};

export default Home;
