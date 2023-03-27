import { useTheme } from "@emotion/react";

import {
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { rice } from "assets/images";
import { Error } from "components";
import { getDate } from "helpers";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "redux/slices/orderSlice";

const MyOrders = () => {
  const [page] = useState(1);
  const { data, isLoading, error } = useGetOrdersQuery({
    offset: page - 1,
    status: "",
  });
  if (isLoading) return <Skeleton />;
  if (error) return <Error />;
  const { orders } = data;
  console.log(orders);
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
            {orders?.length > 0 ? (
              orders?.map((cart, index) => <Order key={cart?.id} cart={cart} />)
            ) : (
              <Typography
                sx={{ width: "100%", textAlign: "center" }}
                variant="h3"
              >
                No Order Yet
              </Typography>
            )}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyOrders;

const Order = ({ cart }) => {
  const { status, createdAt, cost, id } = cart;
  const theme = useTheme();

  return (
    // <>
    //   {cart.items?.map((item, index) => (
    <ListItemButton
      dense
      disableRipple
      disableTouchRipple
      // key={item.item_id}
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
                $ {cost}
              </Typography>
              <Typography
                variant="span"
                fontWeight={300}
                sx={{
                  color: "#A2A2A2",
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
                noWrap
              >
                {id}
              </Typography>
            </Grid>
          }
          secondary={
            <Grid item container gap={1} flexDirection="column" sx={{ mt: 2 }}>
              <Chip
                label={status}
                // color="warnin#g"
                sx={{
                  background:
                    status !== "delivered"
                      ? theme.palette.warning.main
                      : theme.palette.success.main,
                  color: "#fff",
                  borderRadius: ".4rem",
                  width: "max-content",
                }}
              />
              <Typography
                variant="h3"
                fontWeight={400}
                color="secondary"
                sx={{
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                {getDate(createdAt)}
              </Typography>
            </Grid>
          }
        />
      </ListItem>
    </ListItemButton>
    //   ))}
    // </>
  );
};
