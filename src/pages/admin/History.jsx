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
import { Error, Paginations } from "components";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItemsSkeleton } from "./Products";
import { getDate, getImage } from "helpers";
// import { Formik, Form } from "formik/dist";
// import FormikControl from "validation/FormikControl";
// import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getProducts } from "redux/reducers/ProductReducers";
import dayjs from "dayjs";
// import dayjs from "dayjs";
const History = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(dayjs("2022-04-17T15:30"));

  const [page, setPage] = useState(1);
  const {
    products,
    status: load,
    total_pages,
    error,
  } = useSelector(getAllProducts);
  useEffect(() => {
    dispatch(
      getProducts({
        category: false,
        offset: page - 1,
        date_from: getDate(value),
      })
    );
  }, [page, dispatch, value]);

  if (error) return <Error />;

  // const { total_pages } = data;
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
            value={value}
            onChange={(newValue) => setValue(newValue)}
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
          {total_pages > 1 && (
            <Grid item container justifyContent={"center"}>
              <Paginations page={page} setPage={setPage} count={total_pages} />
            </Grid>
          )}
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
