import { useTheme } from "@emotion/react";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { CustomButton, Error } from "components";
import MobileStepper from "components/Steppers";
import { capitalize, getDate, getImage, getTime } from "helpers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOrderQuery } from "redux/slices/orderSlice";

import HoverRating from "components/Ratings";
import { useSelector } from "react-redux";
const SingleOrder = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [state, setState] = useState(1);
  const { data: order, isLoading, error } = useGetOrderQuery(id);

  useEffect(() => {
    switch (order?.status) {
      case "pending":
        setState(1);
        break;
      case "order_placed":
        setState(2);
        break;
      case "confirmed":
        setState(3);
        break;
      case "shipped":
        setState(4);
        break;
      case "out_for_delivery":
        setState(5);
        break;
      case "delivered":
        setState(6);
        break;

      default:
        setState(1);
        break;
    }
  }, [order?.status]);
  if (isLoading) return <Skeleton />;
  if (error) return <Error />;
  const {
    status,
    payment_completed,
    items,
    id: orderId,
    shipping_fee,
    cost,
    address,
    createdAt,
  } = order;
  const fadedWhite = theme.palette.common.fadedWhite;
  const lighterBlack = theme.palette.common.lighterBlack;

  return (
    <Grid item container gap={2} flexDirection={"column"}>
      <Typography color="secondary" variant="h3">
        Order Details
      </Typography>
      <Grid
        item
        container
        flexWrap="nowrap"
        alignItems="center"
        sx={{ p: 1, background: fadedWhite }}
        justifyContent="space-between"
      >
        <Typography
          variant="h4"
          title={orderId}
          sx={{ color: lighterBlack, maxWidth: "60%" }}
        >
          Order ID:{" "}
          <Typography noWrap variant="span" color="secondary">
            {orderId.slice(0, 8)}
          </Typography>
        </Typography>
        <Typography variant="h4" sx={{ color: lighterBlack }}>
          Status:{" "}
          <Typography
            variant="span"
            color={status === "delivered" ? "primary" : "secondary"}
          >
            {status === "order_placed" ? "Order Placed" : capitalize(status)}
          </Typography>{" "}
        </Typography>
      </Grid>
      <Grid
        item
        container
        gap={2}
        flexWrap={{ sm: "nowrap", xs: "wrap" }}
        sx={{ py: 2 }}
      >
        <Grid item xs={12} md={4} sx={{ p: 2, background: fadedWhite }}>
          <Grid item container flexDirection={"column"} gap={2}>
            <Typography variant="h4" color="secondary">
              Order Status
            </Typography>
            <MobileStepper status={state} state={order} />
          </Grid>
        </Grid>
        <Grid item sm={12} sx={{ background: fadedWhite }}>
          <Grid item container>
            <Grid
              item
              container
              flexWrap={"nowrap"}
              alignItems="center"
              sx={{ p: 2 }}
              justifyContent="space-between"
            >
              <Typography variant="h4" flex={1}>
                {" "}
                Total:{" "}
              </Typography>
              <Typography variant="h4" flex={1}>
                $ {(cost + Number(shipping_fee)).toLocaleString()}
              </Typography>
            </Grid>
            <Grid
              item
              container
              flexWrap={"nowrap"}
              alignItems="center"
              sx={{ p: 2 }}
              justifyContent="space-between"
            >
              <Typography variant="h4" flex={1}>
                Placed on:{" "}
              </Typography>
              <Typography variant="h4" flex={1}>
                {getDate(createdAt)}, {getTime(createdAt)}
              </Typography>
            </Grid>
            <Grid
              item
              container
              flexWrap={"nowrap"}
              alignItems="center"
              sx={{ p: 2 }}
              justifyContent="space-between"
            >
              <Typography variant="h4" flex={1}>
                Delivery Address:{" "}
              </Typography>
              <Typography variant="h4" flex={1}>
                {address?.zip_code},{address?.street_address},{address?.state}.
              </Typography>
            </Grid>
          </Grid>
          <Divider flexItem />
          <Grid item container sx={{ p: 2 }} gap={2} flexDirection={"column"}>
            <Typography variant="h4">Item in your Order</Typography>
            <Grid
              item
              container
              justifyContent="space-between"
              gap={2}
              alignItems={{ md: "center", xs: "flex-start" }}
              flexDirection={{ xs: "column", md: "row" }}
            >
              <List sx={{ width: "100%" }} dense>
                {items.map((item) => (
                  <Item item={item} />
                ))}
              </List>
              {!payment_completed && (
                <Grid item sx={{ maxWidth: "100%" }}>
                  <CustomButton
                    title={"Buy Now"}
                    LinkComponent={Link}
                    to={`${process.env.REACT_APP_BASE_URL}/order/checkout?order_id=${orderId}`}
                  />
                </Grid>
              )}
            </Grid>

            <Grid item container flexDirection="column" gap={2}>
              <Typography variant="h4">Rating:</Typography>
            </Grid>
            <Typography variant="h4">
              Payment Method: <Typography variant="span">Stripe</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleOrder;
const Item = ({ item }) => {
  const {
    count,
    item_id,
    product: { images, rating, name, price, slug },
  } = item;
  const image = JSON.parse(images);
  const { token } = useSelector((state) => state.auth);
  const [value, setValue] = useState(rating);
  return (
    <ListItemButton
      disableGutters
      LinkComponent={Link}
      to={token ? `/products/${slug} ` : `/home/products/${slug}`}
    >
      <ListItem
        dense
        alignItems="flex-start"
        secondaryAction={
          <HoverRating
            name="customized-10"
            value={value}
            setValue={setValue}
            id={item_id}
          />
        }
      >
        <ListItemAvatar
          sx={{
            maxHeight: "100%",

            height: "7rem",
            mr: 2,
          }}
        >
          <Avatar
            variant="square"
            src={getImage(image[0])}
            alt={name}
            sx={{
              borderRadius: "1rem",
              minWidth: { md: "9rem", sm: "8rem", xs: "6rem" },
              height: "100%",
              objectFit: "contain",
            }}
          />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <Grid item mt={2} container gap={1} flexDirection="column">
              <Typography variant="h4">
                QTY: <Typography variant="span">{count} </Typography>
              </Typography>
              <Typography variant="h4">${price.toLocaleString()} </Typography>
            </Grid>
          }
          primary={<Typography variant="h4">{name}</Typography>}
        />
      </ListItem>
    </ListItemButton>
  );
};
