import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "redux/reducers/cartReducer";
import { useLazyGetProductsQuery } from "redux/slices/productSlice";
import Error from "./Error";

const CartItems = ({ cat }) => {
  const [getProducts, { data: products, isFetching, isLoading, isError }] =
    useLazyGetProductsQuery();
  useEffect(() => {
    getProducts({
      category: cat,
    });
    //eslint-disable-next-line
  }, [cat]);
  if (isLoading || isFetching) return <Skeleton />;
  if (isError) return <Error />;
  return (
    <>
      {products?.length > 0 ? (
        <Grid
          item
          container
          display="grid"
          gridTemplateColumns={{
            sm: "repeat(auto-fill, minmax(25rem, 1fr))",
            xs: "repeat(2,1fr)",
          }}
        >
          {products?.map((item, index) => (
            <CartItem key={item.id} item={item} />
          ))}
        </Grid>
      ) : (
        <Typography mt={4} gutterBottom variant="h2">
          No Data Yet
        </Typography>
      )}
    </>
  );
};

export default CartItems;

const CartItem = ({ item }) => {
  const { name, price, slug, images } = item;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);
  return (
    <Grid item sx={{ px: 1, py: 2 }}>
      <Card sx={{ width: "100%" }}>
        <CardActionArea component={Link} to={`/products/${slug} `}>
          <CardMedia
            component={"img"}
            sx={{ height: "20rem", width: "100%" }}
            // src={rice}
            alt={name}
            image={images[0]}
            title={name}
          />
          <CardContent>
            <Typography color="secondary">{name}</Typography>
            <Rating name={name} precision={0.5} defaultValue={4} max={5} />
            <Typography color="secondary">
              NGN {price.toLocaleString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() =>
              admin
                ? navigate("/product/edit", { state: slug })
                : dispatch(addToCart(item))
            }
          >
            {admin ? "Edit Product" : "Add to Cart"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
