import { Grid, Typography } from "@mui/material";

import RocketIcon from "assets/svg/Emoji";

import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import { Modals, CustomButton } from "components";

const Status = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setTimeout(() => setOpen(true), 400);
  }, []);
  const status = searchParams.get("status");
  const message = searchParams.get("message");

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
          {status === "success" ? (
            <RocketIcon style={{ fontSize: "5rem" }} />
          ) : (
            <ErrorOutlineOutlined style={{ fontSize: "5rem" }} />
          )}
        </Grid>

        <Typography variant="h3">
          {status === "success" ? "Successful!!!" : "Oops!!!"}
        </Typography>
        <Typography variant="h4">{message}</Typography>
        <Grid item container mt={2}>
          <CustomButton
            title={status === "success" ? "Home" : "View Order"}
            component={Link}
            to={status === "success" ? "/" : "/my-orders"}
          />
        </Grid>
      </Grid>
    </Modals>
  );
};

export default Status;
