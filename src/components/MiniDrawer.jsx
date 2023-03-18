import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Badge,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SearchIcon from "assets/svg/Search";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Button, ButtonBase, Grid } from "@mui/material";
import BoxIcon from "assets/svg/BoxIcon";
import { useTheme } from "@emotion/react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  flexWrap: "nowrap",
  display: "flex",
  alignItems: "center",
  flex: 1,
  // borderRadius: theme.shape.borderRadius,
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
    // marginLeft: theme.spacing(3),
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
  console.log(theme.transitions);
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
              <Typography variant="h2" color="secondary" noWrap component="div">
                MILE 12
              </Typography>
            </Grid>

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
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <SearchButton>Search</SearchButton>
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
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
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
    </Box>
  );
}
