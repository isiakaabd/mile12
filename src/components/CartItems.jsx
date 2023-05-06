import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "redux/reducers/cartReducer";

import { getImage } from "helpers";
import HoverRating from "./Ratings";
import Paginations from "./Paginations";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { getAllProducts } from "redux/reducers/ProductReducers";

const CartItems = ({ products, page, total_pages, setPage }) => {
  const { status: loading, error } = useSelector(getAllProducts);
  const hasNextPage = total_pages > page;
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => setPage((page) => page + 1),
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    rootMargin: "0px 0px 50px 0px",
  });
  return (
    <Grid item container alignItems={"center"} flexDirection={"column"} gap={3}>
      <>
        {products?.length > 0 ? (
          <Grid
            item
            container
            display="grid"
            gridTemplateColumns={{
              sm: "repeat(auto-fill, minmax(25rem, 1fr))",
              xs: "repeat(auto-fill, minmax(18rem, 1fr))",
            }}
            gap={2}
          >
            {products?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Grid>
        ) : (
          <Typography mt={4} gutterBottom variant="h2">
            No Data Yet
          </Typography>
        )}
        {!loading && hasNextPage && (
          <div
            ref={sentryRef}
            style={{
              justifyContent: "center",
              width: "100%",
              display: "flex",
            }}
          >
            <CircularProgress
              variant="indeterminate"
              disableShrink
              color="primary"
              sx={{
                animationDuration: "550ms",

                [`& .${circularProgressClasses.circle}`]: {
                  strokeLinecap: "round",
                },
              }}
              size={20}
              thickness={3}
            />
          </div>
        )}
        {!loading && !hasNextPage && (
          <Grid item container justifyContent={"center"}>
            <Typography variant="h4">No More Product</Typography>
          </Grid>
        )}
      </>

      {/* {total_pages > 1 && (
          <Grid item container justifyContent={"center"}>
            <Paginations page={page} setPage={setPage} count={total_pages} />
          </Grid>
        )} */}
    </Grid>
  );
};

export default CartItems;

const CartItem = ({ item }) => {
  const { name, price, slug, images, rating } = item;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, token } = useSelector((state) => state.auth);
  const image = JSON.parse(images);
  return (
    <Grid item>
      <Card sx={{ width: "100%" }}>
        <CardActionArea
          component={Link}
          to={token ? `/products/${slug} ` : `/home/products/${slug}`}
        >
          <CardMedia
            component={"img"}
            sx={{ height: "20rem", width: "100%" }}
            // src={rice}
            alt={name}
            image={getImage(image[0])}
            title={name}
          />
          <CardContent>
            <Typography color="secondary">{name}</Typography>
            <HoverRating
              name={name}
              value={rating}
              readOnly={true}
              // hover={hover}
              // setHover={setHover}
            />
            <Typography color="secondary">
              {" "}
              $ {price.toLocaleString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              fontWeight: 600,
              fontSize: { md: "1.5rem", sm: "1.4rem", xs: "1.2rem" },
            }}
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
