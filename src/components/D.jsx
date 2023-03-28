import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Badge,
  IconButton,
  InputBase,
  Typography,
  Autocomplete,
  TextField,
  useAutocomplete,
  ListItem,
} from "@mui/material";
import SearchIcon from "assets/svg/Search";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Button, ButtonBase, Grid } from "@mui/material";
import BoxIcon from "assets/svg/BoxIcon";
import { useTheme } from "@emotion/react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "redux/slices/productSlice";
import { useState } from "react";

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
  width: "50rem",
  height: "4rem",
  [theme.breakpoints.up("sm")]: {
    width: "50rem",
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
  const carts = useSelector((state) => state.carts.carts);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
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
              <Typography
                component={Link}
                variant="h2"
                color="secondary"
                // noWrap
                to="/dashboard"
                sx={{ textDecoration: "none" }}
              >
                MILE 12
              </Typography>
            </Grid>

            <UseAutocomplete />
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
      <Grid item container sx={{ pt: 2, px: { md: 5, xs: 2 } }}>
        <Outlet />
      </Grid>
    </Box>
  );
}
const Auto = () => {
  const { data: products } = useGetProductsQuery({ category: "" });
  console.log(products);
  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={products.map((option) => option.name)}
      // getOptionLabel={(option) => {
      //   console.log(option.name);
      //   return option.name;
      // }}
      renderInput={(params) => (
        // <>
        //   <Search>
        //     <SearchIconWrapper>
        //       <SearchIcon />
        //     </SearchIconWrapper>
        //     <StyledInputBase
        //       placeholder="Search…"
        //       inputProps={{ "aria-label": "search" }}
        //       {...params}
        //     />
        //   </Search>
        // </>
        <TextField
          {...params}
          // label="Search input"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
      sx={{ width: "500px" }}
    />
  );
};
function St() {
  return (
    <Grid
      item
      container
      alignItems={"center"}
      flexWrap="nowrap"
      order={{ xs: 3, md: 0 }}
      sx={{
        maxWidth: { md: "max-content", xs: "100%" },
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase />
      </Search>
      {/* <SearchButton>Search</SearchButton> */}
    </Grid>
  );
}
const Listbox = styled("ul")(({ theme }) => ({
  maxWidth: "100%",
  [theme.breakpoints.up("md")]: {
    width: "50rem",
  },
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));
function UseAutocomplete() {
  const { data: products } = useGetProductsQuery({ category: "", search: "" });
  console.log(products);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: products || [],
    getOptionLabel: (option) => option?.name,
  });
  const [state, setState] = useState(getInputProps().value);

  return (
    <div>
      <div {...getRootProps()}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase {...getInputProps()} placeholder="Search..." />
        </Search>
        {/* <Label {...getInputLabelProps()}>useAutocomplete</Label>
        <Input {...getInputProps()} /> */}
      </div>
      {groupedOptions?.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions?.map((option, index) => (
            <ListItem {...getOptionProps({ option, index })}>
              {option?.name}
            </ListItem>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}
