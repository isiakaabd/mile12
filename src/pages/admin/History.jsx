import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Error } from "components";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLazyGetProductsQuery } from "redux/slices/productSlice";
import { CartItemsSkeleton } from "./Products";
import { getDate, getImage } from "helpers";
// import { Formik, Form } from "formik/dist";
// import FormikControl from "validation/FormikControl";
// import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
// import dayjs from "dayjs";
const History = () => {
  // const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [cat] = useState("");
  // const today = new Date();

  const [dateFrom, setDateFrom] = useState("");
  // console.log(dateFrom);

  const [getProducts, { data: products, isLoading: load, isError: isErr }] =
    useLazyGetProductsQuery();
  useEffect(() => {
    getProducts({
      category: false,
      date_direction: "newer",
      date_from: "2011-03-03",
    });
    //eslint-disable-next-line
  }, [cat, dateFrom]);
  if (isErr) return <Error />;
  // const handleChange = (values) => {
  //   setDateFrom(getDate(new Date(values)));
  // };
  const handleChange = (e) => {
    setDateFrom(e);
  };
  return (
    <Grid item container gap={2}>
      {/* {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <Categories setCat={setCat} categories={categories} />
      )} */}
      <Grid item container>
        <Typography variant="h3" flex={1}>
          Recently Listed Items
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dateFrom}
            onChange={(newValue) => handleChange(newValue)}
          />
        </LocalizationProvider>
        {/* <Formik initialValues={{ filter: "" }}>
          {({ values }) => {
            // console.log(getDate(new Date(values.filter)));
            return (
              <Form>
                <Grid item>
                  <FormikControl
                    control={"date"}
                    name="filter"
                    onChange={handleChange}
                  />
                </Grid>
              </Form>
            );
          }}
        </Formik> */}
      </Grid>
      {!load ? (
        <Grid item xs={12}>
          <List
            sx={{
              width: "100%",
            }}
            dense
          >
            {products?.map((cart, index) => (
              <Order key={index} cart={cart} />
            ))}
          </List>
        </Grid>
      ) : (
        <CartItemsSkeleton />
      )}
    </Grid>
  );
};

export default History;
const Order = ({ cart }) => {
  const { createdAt, price, images, name, slug } = cart;

  // const theme = useTheme();
  const image = JSON.parse(images);

  return (
    <ListItemButton
      dense
      disableRipple
      disableTouchRipple
      component={Link}
      to={`/history/${slug}`}
      sx={{ background: "#EFEFEF", borderRadius: ".6rem", mb: 2 }}
    >
      <ListItem
        // alignItems="flex-start"
        dense
        disableGutters
        component="div"
        sx={{
          "& .MuiListItemSecondaryAction-disableGutters": {
            bottom: " 0 !important",
            top: "auto",
          },
        }}
      >
        <ListItemAvatar sx={{ maxHeight: "100%", height: "7rem", mr: 2 }}>
          <Avatar
            src={getImage(image[0])}
            variant="square"
            sx={{
              minWidth: { md: "9rem", sm: "8rem", xs: "6rem" },
              height: "100%",
              objectFit: "contain",
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid item container gap={1} flexDirection="column">
              <Typography
                variant="span"
                fontWeight={400}
                color="secondary"
                nowrap
                sx={{
                  width: "100%",
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                {name}
              </Typography>
              <Typography
                variant="span"
                color="secondary"
                fontWeight={300}
                sx={{
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                $ {price.toLocaleString()}
              </Typography>
            </Grid>
          }
          secondary={
            <Grid item container gap={1} flexDirection="column" sx={{ mt: 2 }}>
              <Typography
                variant="h3"
                fontWeight={400}
                sx={{
                  color: "#A2A2A2",
                  fontSize: { md: "2rem", xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                {getDate(createdAt)}
              </Typography>
            </Grid>
          }
        />
      </ListItem>
    </ListItemButton>
  );
};
