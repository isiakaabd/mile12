import { Grid, Typography } from "@mui/material";
import Modals from "./Modal";
import RocketIcon from "assets/svg/Emoji";
// import CustomButton from "./CustomButton";
// import { Link } from "react-router-dom";

const Success = ({ handleClose, open, id }) => {
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
        {/* <Grid item container mt={2}>
          <CustomButton
            title="View Order Details"
            component={Link}
            to={`/my-orders/${id}`}
          />
        </Grid> */}
      </Grid>
    </Modals>
  );
};

export default Success;
