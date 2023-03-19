import { useTheme } from "@emotion/react";
import { Avatar, Divider, Grid, Rating, Typography } from "@mui/material";
import { rice } from "assets/images";
import { CustomButton } from "components";
import MobileStepper from "components/Steppers";
import React from "react";

const SingleOrder = () => {
  const theme = useTheme();
  const fadedWhite = theme.palette.common.fadedWhite;
  const lighterBlack = theme.palette.common.lighterBlack;
  return (
    <Grid
      item
      container
      gap={2}
      sx={{ pt: 2, px: { md: 5, xs: 2 } }}
      flexDirection={"column"}
    >
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
        <Typography variant="h4" sx={{ color: lighterBlack }}>
          Order ID:{" "}
          <Typography variant="span" color="secondary">
            39847729902873
          </Typography>
        </Typography>
        <Typography variant="h4" sx={{ color: lighterBlack }}>
          Status:{" "}
          <Typography variant="span" color="secondary">
            Delivered
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
            <MobileStepper />
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
                You ordered from:{" "}
              </Typography>
              <Typography variant="h4" flex={1}>
                {" "}
                Mama Gold
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
                {" "}
                Total:{" "}
              </Typography>
              <Typography variant="h4" flex={1}>
                N70,800
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
                10/14/22, 14:32pm
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
                No 6 glens metal street newhaven Extension ,Ogun state
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
              <Grid
                item
                alignItems={"center"}
                container
                gap={2}
                flex={1}
                flexWrap="nowrap"
              >
                <Grid item>
                  <Avatar src={rice} variant="square" />
                </Grid>
                <Grid item container gap={1} flexDirection="column">
                  <Typography variant="h4">Mama Gold 50kg Rice</Typography>
                  <Typography variant="h4">
                    QTY: <Typography variant="span">1 </Typography>
                  </Typography>
                  <Typography variant="h4">NGN70,000 </Typography>
                </Grid>
              </Grid>
              <Grid item sx={{ maxWidth: "100%" }}>
                <CustomButton title={"Buy Again"} />
              </Grid>
            </Grid>

            <Grid item container flexDirection="column" gap={2}>
              <Typography variant="h4">Rating:</Typography>
              <Rating
                name="customized-10"
                precision={0.5}
                defaultValue={4}
                max={5}
                size="large"
              />
            </Grid>
            <Typography variant="h4">
              Payment Method:{" "}
              <Typography variant="span">Cash on delivery</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleOrder;
