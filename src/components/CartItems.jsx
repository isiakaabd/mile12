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
import { rice } from "assets/images";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "redux/reducers/cartReducer";

const CartItems = () => {
  // const arr = [
  //   {
  //     price: 10000,
  //     name: "Mama Gold 50kg Rice",
  //     rating: 4,
  //     number: 1,
  //     id: 0,
  //   },
  //   {
  //     price: 10000,
  //     name: "Mama Gold 50kg Rice",
  //     rating: 3,
  //     number: 1,
  //     id: 1,
  //   },
  //   {
  //     price: 10000,
  //     name: "Mama Gold Love",
  //     rating: 3,
  //     number: 1,
  //     id: 2,
  //   },
  // ];
  return (
    <Grid
      item
      container
      // justifyContent="space-between"
      // gap={{ md: 2, xs: 1, sm: 2 }}
      // sx={{ mt: 3 }}
      display="grid"
      gridTemplateColumns={{
        sm: "repeat(auto-fill, minmax(25rem, 1fr))",
        xs: "repeat(2,1fr)",
      }}
    >
      {Array(200)
        .fill({
          price: 10000,
          name: "Mama Gold 50kg Rice",
          rating: 4,
          number: 1,
          id: 100,
        })
        .map((item, index) => (
          <CartItem key={index} index={index} item={item} />
        ))}
    </Grid>
  );
};

export default CartItems;

const CartItem = ({ item, index }) => {
  const { name, price, rating } = item;
  const dispatch = useDispatch();
  return (
    <Grid item sx={{ px: 1, py: 2 }}>
      <Card sx={{ width: "100%" }}>
        <CardActionArea component={Link} to={`/item/${index} `}>
          <CardMedia
            component={"img"}
            sx={{ height: "20rem", width: "100%" }}
            // src={rice}
            image={rice}
            title="green iguana"
          />
          <CardContent>
            <Typography color="secondary">{name + index}</Typography>
            <Rating
              name="customized-10"
              precision={0.5}
              defaultValue={rating}
              max={5}
            />
            <Typography color="secondary">
              NGN {price.toLocaleString()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => dispatch(addToCart(item))}
          >
            Add to Cart
          </Button>{" "}
        </CardActions>
      </Card>
      {/* <Grid item container flexDirection={"column"}>
        <Grid
          item
          sx={{
            background: "#EFEFEF",
            width: "100%",
            height: "20rem",
            borderRadius: "1rem",
            p: 1,
          }}
        >
          <Avatar
            variant="square"
            src={rice}
            sx={{ maxHeight: "100%", height: "100%", width: "100%" }}
          />
        </Grid>
        <Typography color="secondary">{name + index}</Typography>
        <Rating
          name="customized-10"
          precision={0.5}
          defaultValue={rating}
          max={5}
        />
        <Typography color="secondary">NGN {price.toLocaleString()}</Typography>
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={() => dispatch(addToCart(item))}
        >
          Add to Cart
        </Button>
      </Grid> */}
    </Grid>
  );
};
