import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "redux/reducers/cartReducer";

import { getImage } from "helpers";

const CartItems = ({ products }) => {
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
    </>
  );
};

export default CartItems;

const CartItem = ({ item }) => {
  const { name, price, slug, images } = item;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.auth);
  const image = JSON.parse(images);

  return (
    <Grid item>
      <Card sx={{ width: "100%" }}>
        <CardActionArea component={Link} to={`/products/${slug} `}>
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
            <Rating name={name} precision={0.5} defaultValue={4} max={5} />
            <Typography color="secondary">
              {" "}
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
