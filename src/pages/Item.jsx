import {
  Avatar,
  Button,
  Chip,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { Error } from "components";
import HoverRating from "components/Ratings";
import { getImage } from "helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, getCartItem } from "redux/reducers/cartReducer";
import { useGetProductQuery } from "redux/slices/productSlice";

const Item = () => {
  const { id } = useParams();
  const [active, setactive] = useState(0);
  const { data: product, isLoading, isError } = useGetProductQuery(id);
  const cart = useSelector((state) => state.carts.cart);
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  dispatch(addToCart(item));
  useEffect(() => {
    dispatch(getCartItem(id));
    //eslint-disable-next-line
  }, [id]);
  const [value, setValue] = useState(product?.rating);
  if (isLoading) return <Skeleton />;
  if (isError) return <Error />;
  const { name, desc, price, id: ids, stock_count, images } = product;
  const buyNow = (item) => {
    dispatch(addToCart(item));
    navigate("/carts");
  };
  console.log(product);
  const imagesArray = JSON.parse(images);
  return (
    <Grid
      item
      container
      gap={4}
      flexDirection={{ sm: "row", xs: "column" }}
      sx={{ p: { md: 3 } }}
    >
      <Grid item flex={1}>
        <Grid item container gap={2} sx={{ p: 2 }}>
          <Grid
            item
            sx={{
              border: "1rem solid #F6F6F6",
              width: "40rem",
              height: "30rem",
            }}
          >
            <Avatar
              src={getImage(imagesArray[active])}
              variant="square"
              sx={{ width: "100%", height: "100%", maxHeight: "100%" }}
            />
          </Grid>
          <Grid
            item
            container
            display="grid"
            gap={1}
            gridTemplateColumns={{
              xs: "repeat(auto-fill, minmax(5rem, 1fr))",
            }}
          >
            {imagesArray?.map((item, idx) => (
              <Grid
                key={idx}
                item
                sx={{
                  p: 0.5,
                  border: `.3rem solid ${
                    idx === active ? "#EBC1FF" : "#F6F6F6"
                  }`,
                }}
              >
                <Avatar
                  variant="square"
                  src={getImage(item)}
                  sx={{ cursor: "pointer", transition: "border 1ms linear" }}
                  onClick={() => setactive(idx)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item flex={1}>
        <Grid item container sx={{ p: 2 }} gap={2} flexDirection={"column"}>
          <Chip
            sx={{
              background: "#F3D9FF",
              color: stock_count !== 0 ? "#AE01FF" : "#f00",
              borderRadius: ".3rem",
              width: "max-content",
            }}
            label={stock_count !== 0 ? "In stock" : "Out of stock"}
          />

          <Typography variant="h2">{name}</Typography>
          <Typography variant="h5">
            Brand:
            <Typography variant="span" sx={{ color: "#9C9DA9" }}>
              {desc}
            </Typography>
          </Typography>
          <HoverRating
            name={name}
            value={value}
            readOnly={admin ? true : false}
            setValue={setValue}
            id={ids}
          />
          <Typography variant="h2">$ {price.toLocaleString()}</Typography>
          {/* <Grid item container alignItems={"center"} flexWrap="nowrap" gap={2}>
            <Button
              size="small"
              disableElevation
              disableRipple
              variant="contained"
              sx={{
                minWidth: "2rem",
                fontWeight: 500,
                fontSize: { md: "1.2rem", xs: "1rem" },
                color: "#AE01FF",
                background: "#F6F6F6",
                "&:hover": {
                  color: "#fff",
                },
              }}
              // onClick={handleReduce}
            >
              -
            </Button>
            <Typography color="primary">{number}</Typography>
            <Button
              size="small"
              disableElevation
              disableRipple
              variant="contained"
              sx={{
                minWidth: "2rem",
                fontWeight: 600,
                fontSize: { md: "1.2rem", xs: "1rem" },

                color: "#AE01FF",
                background: "#F6F6F6",
                "&:hover": {
                  color: "#fff",
                },
              }}
              // onClick={handleAdd}
            >
              +
            </Button>
          </Grid> */}
          {!admin && (
            <Grid item container gap={2} flexWrap={"nowrap"}>
              <Button variant="outlined" onClick={() => buyNow(product)}>
                BUY NOW
              </Button>

              <Button
                variant="contained"
                disableElevation
                onClick={
                  !cart?.addedToCart
                    ? () => {
                        dispatch(addToCart(product));
                        dispatch(getCartItem(id));
                      }
                    : () => navigate("/carts")
                }
              >
                {!cart?.addedToCart ? "ADD TO CART" : "GO TO CART"}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Item;
