import { useTheme } from "@emotion/react";
import { CancelOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { CustomButton } from "components";
import Modals from "components/Modal";
import { getImage } from "helpers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from "redux/reducers/cartReducer";

const CartsList = () => {
  const { carts, totalPayout } = useSelector((state) => state.carts);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  return (
    <>
      <Grid item container gap={2} flexDirection={"column"}>
        <Typography color="secondary" variant="h3">
          {`Carts (${carts?.length})`}
        </Typography>
        <Grid item container gap={2} flexWrap={{ md: "nowrap" }}>
          <Grid item xs={12} md={8}>
            <List
              sx={{
                width: "100%",
                background: "#EFEFEF",
                borderRadius: ".6rem",
              }}
              dense
            >
              {carts.length > 0 ? (
                carts.map((cart, index) => (
                  <ListItems key={index} cart={cart} />
                ))
              ) : (
                <Typography
                  gutterBottom
                  sx={{ py: 4, textAlign: "center", width: "100%" }}
                  variant="h3"
                >
                  No Item in the Cart yet
                </Typography>
              )}
            </List>
          </Grid>
          <Grid item md={4} xs={12}>
            <Grid
              item
              container
              gap={2}
              flexDirection="column"
              sx={{ background: "#EFEFEF", p: 2, borderRadius: ".6rem" }}
            >
              <Typography
                variant="h3"
                // sx={{ fontSize: { md: "2rem", xs: "1.6rem" } }}
                color="secondary"
              >
                Cart Summary
              </Typography>
              <Grid
                item
                container
                flexWrap="nowrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">Subtotal</Typography>
                <Typography variant="h5">
                  $ {totalPayout?.toLocaleString()}
                </Typography>
              </Grid>
              <Typography variant="h6" sx={{ color: "#8F8D8D" }}>
                Delivery fees not included yet
              </Typography>
              <Divider flexItem />
              <CustomButton
                title={"Proceed to Checkout"}
                component={Link}
                disabled={totalPayout === 0}
                to="/checkout"
              />
              <Grid item ml="auto">
                <Button
                  sx={{ color: "red" }}
                  startIcon={<DeleteOutlineOutlined />}
                  onClick={() => setModalOpen(true)}
                >
                  Delete Cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modals isOpen={modalOpen} handleClose={handleClose}>
        <Grid
          item
          container
          alignItems="center"
          sx={{ py: 2 }}
          gap={2}
          flexDirection="column"
        >
          <Grid item>
            <CancelOutlined style={{ fontSize: "5rem" }} />
          </Grid>

          <Typography variant="h3">Clear Carts</Typography>
          <Grid
            item
            container
            justifyContent={"space-between"}
            mt={2}
            flexWrap={"nowrap"}
          >
            <Button
              variant="outlined"
              sx={{
                padding: ".6em 1.2em",
                fontSize: { md: "1.4rem", xs: "1.2rem" },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              title="clear"
              variant="contained"
              disableElevation
              onClick={() => {
                localStorage.removeItem("carts");
                setTimeout(() => handleClose(), 2000);
                toast.success("carts cleared");
              }}
              sx={{
                bgcolor: "#f00",
                color: "#fff",
                padding: ".6em 1.2em",
                fontSize: { md: "1.4rem", xs: "1.2rem" },
              }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Modals>
    </>
  );
};
export default CartsList;
const ListItems = ({ cart }) => {
  const { name, rating, number, price, totalPrice, images } = cart;
  const theme = useTheme();

  const dispatch = useDispatch();
  const handleReduce = () => {
    dispatch(decreaseCartItem(cart));
  };
  const handleRemove = () => {
    dispatch(removeCartItem(cart));
  };
  const handleAdd = () => {
    dispatch(increaseCartItem(cart));
  };
  const imagesArray = JSON.parse(images);
  return (
    <ListItemButton dense disableRipple disableTouchRipple>
      <ListItem
        alignItems="flex-start"
        dense
        disableGutters
        component="div"
        secondaryAction={
          <Grid item container gap={1} flexDirection={"column"}>
            <Typography>$ {(totalPrice || price)?.toLocaleString()}</Typography>
            <Grid item container flexWrap="nowrap" gap={2}>
              <Button
                size="small"
                disableElevation
                disableRipple
                variant="contained"
                sx={{
                  minWidth: "2rem",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: { md: "1.2rem", xs: "1rem" },
                  background: theme.palette.info.main,
                  "&:hover": {
                    background: theme.palette.info.main,
                  },
                }}
                onClick={handleReduce}
              >
                -
              </Button>
              <Typography>{number}</Typography>
              <Button
                size="small"
                disableElevation
                disableRipple
                variant="contained"
                sx={{
                  minWidth: "2rem",
                  fontWeight: 600,
                  fontSize: { md: "1.2rem", xs: "1rem" },
                  color: "#fff",
                  background: theme.palette.primary.main,
                  "&:hover": {
                    background: theme.palette.primary.main,
                  },
                }}
                onClick={handleAdd}
              >
                +
              </Button>
            </Grid>
          </Grid>
        }
      >
        <ListItemAvatar sx={{ height: "8rem", width: "8rem", mr: 2 }}>
          <Avatar
            src={getImage(imagesArray[0])}
            alt={name}
            variant="square"
            sx={{ height: "100%", width: "100%", borderRadius: "1rem" }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid item>
              <Typography variant="h4">{name}</Typography>
              <Rating
                name="customized-10"
                precision={0.5}
                defaultValue={rating}
                max={5}
              />
              <Grid item>
                <Button
                  color="error"
                  startIcon={<DeleteOutlineOutlined />}
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
    </ListItemButton>
  );
};
