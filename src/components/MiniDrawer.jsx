import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Badge,
  IconButton,
  InputBase,
  Avatar,
  Fab,
} from "@mui/material";
import SearchIcon from "assets/svg/Search";
import { MessageOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Button, ButtonBase, Grid } from "@mui/material";
import BoxIcon from "assets/svg/BoxIcon";
import { useTheme } from "@emotion/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLazyGetProductsQuery } from "redux/slices/productSlice";
import { getProducts } from "redux/reducers/ProductReducers";
import { logo } from "assets/images";
import Modals from "./Modal";
import { Form, Formik } from "formik/dist";
import FormikControl from "validation/FormikControl";
import CustomButton from "./CustomButton";
import * as Yup from "yup";
import { useCreateContactMutation } from "redux/slices/orderSlice";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  flexWrap: "nowrap",
  display: "flex",
  alignItems: "center",
  flex: 1,
  border: "1px solid #DFDFDF",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "auto",
  height: "4rem",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "4rem",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "secondary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    maxWidth: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40rem",
    },
  },
}));
const SearchButton = styled(LoadingButton)(({ theme }) => ({
  color: "secondary",
  "&.MuiLoadingButton-root": {
    borderRadius: ".6rem",
    height: "4rem",
    color: "#000",
    fontSize: "1.6rem",
    fontWeight: 500,
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create("width"),
    width: "8rem",
  },
}));
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Enter Valid Email").required("Required"),
  message: Yup.string().required("Required"),
});
export default function PrimarySearchAppBar() {
  const theme = useTheme();
  const [sendMessage, { isLoading: load }] = useCreateContactMutation();
  const carts = useSelector((state) => state.carts.carts);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSearch = async () => {
    setLoading(true);
    dispatch(
      getProducts({
        category: "",
        search: value,
      })
    );
    setLoading(false);
    setTimeout(() => setValue(""), 400);
  };
  const navigate = useNavigate();

  const { token, admin } = useSelector((state) => state.auth);
  const fabStyle = {
    position: "fixed",
    bottom: 30,
    right: 30,
  };
  const [state, setState] = useState(false);
  const handleSubmit = async (values) => {
    const { email, name, message } = values;
    const { data, error } = await sendMessage({
      email,
      name,
      message,
    });
    if (data) {
      toast.success(data);
      setTimeout(() => setState(false), 3000);
    }
    if (error) toast.error(error);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, position: "relative", minHeight: "100vh" }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            background: "#fff",
            borderBottom: "1px solid #DFDFDF",
            paddingInline: { md: "2rem", xs: 0 },
            py: 1,
          }}
        >
          <Toolbar>
            <Grid
              item
              container
              flexWrap={"wrap"}
              alignItems="center"
              sx={{
                transition: theme.transitions.create("order"),
                gap: { xs: 1 },
              }}
            >
              <Grid item sx={{ mr: { xs: "auto", md: 3 } }}>
                <Avatar
                  component={Link}
                  to={"/"}
                  src={logo}
                  alt="MILE 12"
                  title="MILE 12"
                />
              </Grid>

              <Grid
                item
                container
                alignItems={"center"}
                flexWrap="nowrap"
                order={{ xs: 3, sm: 0, md: 0 }}
                sx={{
                  maxWidth: { sm: "max-content", xs: "100%" },
                }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <SearchButton onClick={handleSearch} isLoading={loading}>
                  Search
                </SearchButton>
              </Grid>
              <Grid
                item
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: { xs: "flex-end" },
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  // component={Link}

                  onClick={() => navigate(!token ? "/auth/login" : "my-orders")}
                  sx={{
                    border: "none",
                    "&:hover": { border: "none" },
                    fontSize: { md: "1.5rem" },
                  }}
                  endIcon={token && <BoxIcon />}
                >
                  {!token ? "Login" : "My Orders"}
                </Button>
              </Grid>
              {/* <Box  /> */}
              {!admin && (
                <Box>
                  <IconButton
                    size="large"
                    aria-label={`show ${carts?.length} cart item`}
                    color="inherit"
                    component={Link}
                    to="/carts"
                  >
                    <Badge badgeContent={carts?.length} color="error">
                      <ShoppingCartOutlined
                        color="secondary"
                        sx={{ fontSize: "2rem" }}
                      />
                    </Badge>
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid
          item
          container
          sx={{ pt: { md: "9rem", xs: "12rem" }, px: { md: 5, xs: 2 } }}
        >
          <Fab
            color="primary"
            aria-label="add"
            sx={fabStyle}
            onClick={() => setState(true)}
          >
            <MessageOutlined />
          </Fab>
          <Outlet />
        </Grid>
      </Box>

      <Modals isOpen={state} handleClose={() => setState(false)}>
        <Grid item container>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form style={{ width: "100%" }}>
              <Grid item container gap={2}>
                <Grid item container>
                  <FormikControl name="name" placeholder="Name" />
                </Grid>
                <Grid item container>
                  <FormikControl name="email" placeholder="Email Address" />
                </Grid>
                <Grid item container>
                  <FormikControl
                    name="message"
                    control={"textarea"}
                    minRows={5}
                    placeholder="Message"
                  />
                </Grid>
                <Grid item>
                  <CustomButton title={"Submit"} isSubmitting={load} />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Modals>
    </>
  );
}
