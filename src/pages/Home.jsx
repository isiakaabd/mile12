import { Grid } from "@mui/material";
import { CartItems, Categories, Error } from "components";
import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "redux/slices/productSlice";
import { CartItemsSkeleton, CategoriesSkeleton } from "./admin/Products";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProducts } from "redux/reducers/ProductReducers";

const Home = () => {
  const {
    data: categories,
    isLoading,
    error: isError,
  } = useGetCategoriesQuery();
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const [cat, setCat] = useState("");
  const { products, total_pages, error } = useSelector(getAllProducts);
  useEffect(() => {
    dispatch(
      getProducts({
        category: cat,
        offset: page - 1,
      })
    );
  }, [cat, page, dispatch]);
  if (error || isError) return <Error />;
  // const hasNextPage = page + 1 < comments?.total_pages;

  return (
    <Grid item container pb={4}>
      {isLoading ? (
        <CategoriesSkeleton />
      ) : isError ? (
        <Error />
      ) : (
        <Categories setCat={setCat} categories={categories} />
      )}
      {false ? (
        <CartItemsSkeleton />
      ) : error ? (
        <Error />
      ) : (
        <CartItems
          products={products}
          setPage={setPage}
          page={page}
          total_pages={total_pages}
        />
      )}
    </Grid>
  );
};

export default Home;
