import { Grid, Typography } from "@mui/material";
import Modals from "./Modal";
import RocketIcon from "assets/svg/Emoji";
import { Rocket } from "@mui/icons-material";
import CustomButton from "./CustomButton";

const Success = ({ handleClose, open }) => {
  return (
    <Modals isOpen={open} handleClose={handleClose}>
      <Grid
        item
        container
        alignItems="center"
        sx={{ py: 2 }}
        gap={2}
        flexDirection="column"
      >
        <Grid item>
          <RocketIcon style={{ fontSize: "5rem" }} />
        </Grid>

        <Typography variant="h3">Order Successful</Typography>
        <Typography variant="h4">Your Order has been received</Typography>
        <Grid item container mt={2}>
          <CustomButton title="View Order Details" />
        </Grid>
      </Grid>
    </Modals>
  );
};

export default Success;
