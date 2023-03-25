import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { rice } from "assets/images";
import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const History = () => {
  // const carts = useSelector((state) => state.carts.carts);

  return (
    <Grid item container gap={2} flexWrap={{ md: "nowrap" }}>
      <Grid item xs={12}>
        <List
          sx={{
            width: "100%",
          }}
          dense
        >
          {Array(10)
            .fill({ id: 1 })
            .map((cart, index) => (
              <Order key={index} cart={cart} />
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default History;
const Order = ({ cart }) => {
  const {
    //  totalPrice, price, name, rating,
    id,
  } = cart;
  // const theme = useTheme();

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
                Mama Gold 50kg Rice
              </Typography>
              <Typography
                variant="span"
                color="secondary"
                fontWeight={300}
                sx={{
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                NGN70,000
              </Typography>
            </Grid>
          }
          secondary={
            <Grid item container gap={1} flexDirection="column" sx={{ mt: 2 }}>
              <Typography
                variant="h3"
                fontWeight={400}
                sx={{
                  color: "#A2A2A2",
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
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
