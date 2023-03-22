import { ArrowBackOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";

const Order = () => {
  return (
    <Grid item container gap={2} flexDirection={"column"}>
      <Grid item>
        <IconButton size="large" edge="start">
          <ArrowBackOutlined sx={{ fontSize: "4rem" }} />
        </IconButton>
      </Grid>
      <Grid item sx={{ ml: "auto" }}>
        <Grid item container alignItems={"center"} gap={4}>
          <Typography gutterBottom>Order status:</Typography>
          <Button sx={{ py: 1 }} variant="contained">
            Update
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        container
        sx={{
          px: 2,
          py: 4,
          borderRadius: "1rem",
          background: " rgba(204, 95, 255, 0.08)",
        }}
        gap={2}
      >
        <Grid item>
          <Typography variant="h6">Items Information</Typography>
        </Grid>
        <Grid item container flexWrap="nowrap" sx={{ "&>*": { flex: 1 } }}>
          <Grid item container flexDirection={"column"}>
            <Typography variant="body2" sx={{ color: "#979797" }}>
              Sender
            </Typography>
            <Typography variant="body2">George Fernandez</Typography>
          </Grid>
          <Grid item container flexDirection={"column"}>
            <Typography variant="body2" sx={{ color: "#979797" }}>
              Category
            </Typography>
            <Typography variant="body2">Clothing & Wears</Typography>
          </Grid>
          <Grid item container flexDirection={"column"}>
            <Typography variant="body2" sx={{ color: "#979797" }}>
              Delivery Fee
            </Typography>
            <Typography variant="body2">NGN 2000</Typography>
          </Grid>
          <Grid item container flexDirection={"column"}>
            <Typography variant="body2" sx={{ color: "#979797" }}>
              Item Value
            </Typography>
            <Typography variant="body2">NGN 70,000</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Order;
