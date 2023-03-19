import { useTheme } from "@emotion/react";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { CustomButton } from "components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decreaseCartItem, increaseCartItem } from "redux/reducers/cartReducer";

const CartsList = () => {
  const carts = useSelector((state) => state.carts.carts);

  return (
    <Grid
      item
      container
      gap={2}
      sx={{ pt: 2, px: { md: 5, xs: 2 } }}
      flexDirection={"column"}
    >
      <Typography color="secondary" variant="h3">
        {`Carts (${carts?.length})`}
      </Typography>
      <Grid item container gap={2} flexWrap={{ md: "nowrap" }}>
        <Grid item xs={12} md={8}>
          <List
            sx={{
              width: "100%",
              background: "#EFEFEF",
              borderRadius: ".6rem",
            }}
            dense
          >
            {carts.map((cart, index) => (
              <ListItems key={index} cart={cart} />
            ))}
          </List>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid
            item
            container
            gap={2}
            flexDirection="column"
            sx={{ background: "#EFEFEF", p: 2, borderRadius: ".6rem" }}
          >
            <Typography
              variant="h3"
              // sx={{ fontSize: { md: "2rem", xs: "1.6rem" } }}
              color="secondary"
            >
              Cart Summary
            </Typography>
            <Grid
              item
              container
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h5">Subtotal</Typography>
              <Typography variant="h5">NGN 140,000</Typography>
            </Grid>
            <Typography variant="h6" sx={{ color: "#8F8D8D" }}>
              Delivery fees not included yet
            </Typography>
            <Divider flexItem />
            <CustomButton
              title={"Proceed to Checkout"}
              component={Link}
              to="/checkout"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default CartsList;
const ListItems = ({ cart }) => {
  const { name, rating, price, totalPrice, number } = cart;
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleReduce = () => {
    dispatch(decreaseCartItem(cart));
  };
  const handleAdd = () => {
    dispatch(increaseCartItem(cart));
  };
  return (
    <ListItemButton dense disableRipple disableTouchRipple>
      <ListItem
        alignItems="flex-start"
        dense
        disableGutters
        component="div"
        secondaryAction={
          <Grid item container gap={1} flexDirection={"column"}>
            <Typography>
              NGN {(totalPrice || price)?.toLocaleString()}
            </Typography>
            <Grid item container flexWrap="nowrap" gap={2}>
              <Button
                size="small"
                disableElevation
                disableRipple
                variant="contained"
                sx={{
                  minWidth: "2rem",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: { md: "1.2rem", xs: "1rem" },
                  background: theme.palette.info.main,
                  "&:hover": {
                    background: theme.palette.info.main,
                  },
                }}
                onClick={handleReduce}
              >
                -
              </Button>
              <Typography>{number}</Typography>
              <Button
                size="small"
                disableElevation
                disableRipple
                variant="contained"
                sx={{
                  minWidth: "2rem",
                  fontWeight: 600,
                  fontSize: { md: "1.2rem", xs: "1rem" },
                  color: "#fff",
                  background: theme.palette.primary.main,
                  "&:hover": {
                    background: theme.palette.primary.main,
                  },
                }}
                onClick={handleAdd}
              >
                +
              </Button>
            </Grid>
          </Grid>
        }
      >
        <ListItemAvatar>
          <Avatar>H</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid item>
              <Typography>{name}</Typography>
              <Rating
                name="customized-10"
                precision={0.5}
                defaultValue={rating}
                max={5}
              />
              <Grid item>
                <Button color="error" startIcon={<DeleteOutlineOutlined />}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
    </ListItemButton>
  );
};
