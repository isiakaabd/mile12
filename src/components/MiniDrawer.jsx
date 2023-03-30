import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Badge,
  IconButton,
  InputBase,
  Avatar,
} from "@mui/material";
import SearchIcon from "assets/svg/Search";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Button, ButtonBase, Grid } from "@mui/material";
import BoxIcon from "assets/svg/BoxIcon";
import { useTheme } from "@emotion/react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLazyGetProductsQuery } from "redux/slices/productSlice";
import { getProducts } from "redux/reducers/ProductReducers";
import { logo } from "assets/images";

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
const SearchButton = styled(ButtonBase)(({ theme }) => ({
  color: "secondary",
  "&.MuiButtonBase-root": {
    borderRadius: ".6rem",
    height: "4rem",
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create("width"),
    width: "8rem",
  },
}));

export default function PrimarySearchAppBar() {
  const theme = useTheme();
  const [searchProduct] = useLazyGetProductsQuery();
  const carts = useSelector((state) => state.carts.carts);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleSearch = async () => {
    const { data } = await searchProduct({
      category: "",
      search: value,
    });
    dispatch(getProducts(data));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                to={"/dashboard"}
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
              <SearchButton onClick={handleSearch}>Search</SearchButton>
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
                component={Link}
                to="my-orders"
                sx={{
                  border: "none",
                  "&:hover": { border: "none" },
                  fontSize: { md: "1.5rem" },
                }}
                endIcon={<BoxIcon />}
              >
                My Orders
              </Button>
            </Grid>
            {/* <Box  /> */}
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
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        item
        container
        sx={{ pt: { md: "9rem", xs: "12rem" }, px: { md: 5, xs: 2 } }}
      >
        <Outlet />
      </Grid>
    </Box>
  );
}
