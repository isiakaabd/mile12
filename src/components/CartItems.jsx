import { Avatar, Button, Grid, Rating, Typography } from "@mui/material";
import { rice } from "assets/images";
import { useDispatch } from "react-redux";
import { addToCart } from "redux/reducers/cartReducer";

const CartItems = () => {
  const arr = [
    {
      price: 10000,
      name: "Mama Gold 50kg Rice",
      rating: 4,
      number: 1,
      id: 0,
    },
    {
      price: 10000,
      name: "Mama Gold 50kg Rice",
      rating: 3,
      number: 1,
      id: 1,
    },
    {
      price: 10000,
      name: "Mama Gold Love",
      rating: 3,
      number: 1,
      id: 2,
    },
  ];
  return (
    <Grid
      item
      container
      justifyContent="space-between"
      gap={{ md: 2, xs: 1, sm: 2 }}
      sx={{ mt: 3 }}
    >
      {arr
        //   Array(200)
        // .fill({
        //   price: 10000,
        //   name: "Mama Gold 50kg Rice",
        //   rating: 4,
        //   number: 1,
        //   id:
        // })
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
    <Grid item xs={5} md={2} sx={{ px: 1, py: 2 }}>
      <Grid item container flexDirection={"column"}>
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
        <Typography color="secondary" nowrap>
          {name + index}
        </Typography>
        <Rating
          name="customized-10"
          precision={0.5}
          defaultValue={rating}
          max={5}
        />
        <Typography color="secondary" nowrap>
          NGN {price.toLocaleString()}
        </Typography>
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={() => dispatch(addToCart(item))}
        >
          Add to Cart
        </Button>
      </Grid>
    </Grid>
  );
};
