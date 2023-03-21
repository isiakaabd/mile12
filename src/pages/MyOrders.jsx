import { useTheme } from "@emotion/react";
import {} from "@mui/icons-material";
import {
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { rice } from "assets/images";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const carts = useSelector((state) => state.carts.carts);

  return (
    <Grid item container gap={2} flexDirection={"column"}>
      <Typography color="secondary" variant="h3">
        My Orders
      </Typography>
      <Grid item container gap={2} flexWrap={{ md: "nowrap" }}>
        <Grid item xs={12}>
          <List
            sx={{
              width: "100%",
            }}
            dense
          >
            {carts.map((cart, index) => (
              <Order key={index} cart={cart} />
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyOrders;

const Order = ({ cart }) => {
  const {
    //  totalPrice, price, name, rating,
    id,
  } = cart;
  const theme = useTheme();

  return (
    <ListItemButton
      dense
      disableRipple
      disableTouchRipple
      component={Link}
      to={`/my-orders/${id}`}
      sx={{ background: "#EFEFEF", borderRadius: ".6rem", mb: 2 }}
    >
      <ListItem
        // alignItems="flex-start"
        dense
        disableGutters
        component="div"
        secondaryAction={
          <Typography
            variant="h3"
            fontWeight={400}
            color="primary"
            sx={{
              fontSize: { xs: "1.4rem", md: "1.6rem" },
            }}
          >
            See Details
          </Typography>
        }
        sx={{
          "& .MuiListItemSecondaryAction-disableGutters": {
            bottom: " 0 !important",
            top: "auto",
          },
        }}
      >
        <ListItemAvatar sx={{ height: "100%", mr: 2 }}>
          <Avatar
            src={rice}
            variant="square"
            sx={{
              minWidth: { md: "9rem", sm: "8rem", xs: "6rem" },
              height: "100%",
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid item container gap={1} flexDirection="column">
              <Typography
                variant="span"
                fontWeight={400}
                color="secondary"
                nowrap
                sx={{
                  width: "100%",
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                Mama Gold 50kg Rice - NGN70,000
              </Typography>
              <Typography
                variant="span"
                fontWeight={300}
                sx={{
                  color: "#A2A2A2",
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                Order 2322984736
              </Typography>
            </Grid>
          }
          secondary={
            <Grid item container gap={1} flexDirection="column" sx={{ mt: 2 }}>
              <Chip
                label={"Delivered"}
                // color="warnin#g"
                sx={{
                  background: theme.palette.warning.main,
                  color: "#fff",
                  borderRadius: ".4rem",
                  width: "max-content",
                }}
              />
              <Typography
                variant="h3"
                fontWeight={400}
                color="secondary"
                sx={{ fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" } }}
              >
                On 07-02-2023
              </Typography>
            </Grid>
          }
        />
      </ListItem>
    </ListItemButton>
  );
};
