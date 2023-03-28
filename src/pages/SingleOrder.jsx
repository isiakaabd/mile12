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
import { getConfig, getDate, getImage, getTime } from "helpers";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderQuery,
  useVerifyOrderMutation,
} from "redux/slices/orderSlice";
import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import HoverRating from "components/Ratings";
const SingleOrder = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [state, setState] = useState(1);
  const { data: order, isLoading, error } = useGetOrderQuery(id);
  const config = getConfig({
    email: order?.user?.email,
    reference: order?.id,
    amount: order?.cost,
  });
  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    switch (order?.status) {
      case "order_placed":
        setState(1);
        break;
      case "confirmed":
        setState(2);
        break;
      case "shipped":
        setState(3);
        break;
      case "out_for_delivery":
        setState(4);
        break;
      case "delivered":
        setState(5);
        break;

      default:
        setState(1);
        break;
    }
  }, [order?.status]);
  const [verifyOrder, { isLoading: load }] = useVerifyOrderMutation();
  if (isLoading) return <Skeleton />;
  if (error) return <Error />;
  const {
    status,
    payment_completed,
    items,
    id: orderId,
    cost,
    address,
    createdAt,
  } = order;
  const fadedWhite = theme.palette.common.fadedWhite;
  const lighterBlack = theme.palette.common.lighterBlack;

  const onSuccess = () => {
    // Implementation for whatever you want to do with reference and after success call.
    const { data, error } = verifyOrder({
      id: orderId,
    });
    if (data) toast.success(data);
    if (error) toast.error(error);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

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
          noWrap
          title={orderId}
          sx={{ color: lighterBlack, maxWidth: "60%" }}
        >
          Order ID:{" "}
          <Typography variant="span" color="secondary">
            {orderId}
          </Typography>
        </Typography>
        <Typography variant="h4" sx={{ color: lighterBlack }}>
          Status:{" "}
          <Typography
            variant="span"
            color={status === "delivered" ? "success" : "secondary"}
          >
            {status === "order_placed" ? "Order Placed" : status}
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
            <MobileStepper status={state} />
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
                $ {cost.toLocaleString()}
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
                    isSubmitting={load}
                    onClick={() => {
                      initializePayment(onSuccess, onClose);
                    }}
                  />
                </Grid>
              )}
            </Grid>

            <Grid item container flexDirection="column" gap={2}>
              <Typography variant="h4">Rating:</Typography>
            </Grid>
            <Typography variant="h4">
              Payment Method: <Typography variant="span">Paystack</Typography>
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
  const [value, setValue] = useState(rating);
  return (
    <ListItemButton
      disableGutters
      LinkComponent={Link}
      to={`/products/${slug}`}
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
