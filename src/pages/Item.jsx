import {
  Avatar,
  Button,
  Chip,
  Grid,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { Error } from "components";
import { getImage } from "helpers";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "redux/slices/productSlice";

const Item = () => {
  //   const theme = useTheme();
  const [number] = useState(20); //setnumber
  const { id } = useParams();
  const [active, setactive] = useState(0);
  const { data: product, isLoading, isError } = useGetProductQuery(id);

  if (isLoading) return <Skeleton />;
  if (isError) return <Error />;
  const { name, desc, price, images } = product;
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
              color: "#AE01FF",
              borderRadius: ".3rem",
              width: "max-content",
            }}
            label="In stock"
          />

          <Typography variant="h2">{name}</Typography>
          <Typography variant="h5">
            Brand:
            <Typography variant="span" sx={{ color: "#9C9DA9" }}>
              {desc}
            </Typography>
          </Typography>
          <Rating
            name={name}
            precision={0.5}
            defaultValue={4}
            max={5}
            size="large"
          />
          <Typography variant="h2">NGN {price.toLocaleString()}</Typography>
          <Grid item container flexWrap="nowrap" gap={2}>
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
          </Grid>
          <Grid item container gap={2} flexWrap={"nowrap"}>
            <Button variant="outlined">BUY NOW</Button>
            <Button variant="contained" disableElevation>
              ADD TO CART
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Item;
