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
import { Error, Paginations } from "components";
import { getDate, getImage } from "helpers";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "redux/slices/orderSlice";

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetOrdersQuery({
    offset: page - 1,
    status: "",
  });
  if (isLoading) return <Skeleton />;
  if (error) return <Error />;

  const { orders, total_pages } = data;
  return (
    <Grid item container gap={2} flexDirection={"column"}>
      <Typography color="secondary" variant="h3">
        My Orders
      </Typography>
      <Grid item container gap={2} flexWrap={{ md: "nowrap" }}>
        <Grid item container>
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
      {total_pages > 1 && (
        <Grid item container justifyContent={"center"}>
          <Paginations page={page} setPage={setPage} count={total_pages} />
        </Grid>
      )}
    </Grid>
  );
};

export default MyOrders;

const Order = ({ cart }) => {
  const { status, createdAt, cost, id, items } = cart;
  const theme = useTheme();
  const prod = items[0]?.product;
  // console.log(items[]);
  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  // console.log(isJsonString(prod?.images));
  let imgs = isJsonString(prod?.images) ? JSON.parse(prod?.images) : [];
  //  const img = JSON.parse(imgs[0]);
  // console.log(imgs[0]);
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
      sx={{
        background: "#EFEFEF",
        width: "100%",
        borderRadius: ".6rem",
        mb: 2,
      }}
    >
      <ListItem
        alignItems="flex-start"
        dense
        disableGutters
        component="div"
        secondaryAction={
          <Typography
            variant="h3"
            fontWeight={400}
            color="primary"
            sx={{
              display: { xs: "", sm: "block" },
              fontSize: { xs: "1rem", sm: "1.4rem", md: "1.6rem" },
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
        <ListItemAvatar
          sx={{
            // height: "7rem",

            width: { md: "15rem", sm: "13rem", xs: "10rem" },
            height: { md: "15rem", sm: "13rem", xs: "10rem" },
            mr: 2,
          }}
        >
          <Avatar
            src={getImage(imgs[0])}
            variant="square"
            sx={{
              width: "100%",
              height: "100%",
              // height: { md: "", sm: "8rem", xs: "12rem" },
              borderRadius: 2,
              // : "100%",
            }}
            alt={prod?.name}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid item container sx gap={1} flexDirection="column">
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
                variant="p"
                fontWeight={300}
                title={id}
                sx={{
                  color: "#A2A2A2",
                  // display: "none",
                  width: { md: "80%", xs: "10rem" },
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
