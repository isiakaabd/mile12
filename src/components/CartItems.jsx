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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "redux/reducers/cartReducer";

import { getImage } from "helpers";
import HoverRating from "./Ratings";

const CartItems = ({ products }) => {
  console.log(products);
  return (
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
    </>
  );
};

export default CartItems;

const CartItem = ({ item }) => {
  const { name, price, slug, images, rating } = item;
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
