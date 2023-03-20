import { styled, alpha } from "@mui/material/styles";
import { AppBar, Toolbar, InputBase } from "@mui/material";
import SearchIcon from "assets/svg/Search";
import { ButtonBase, Grid } from "@mui/material";

import { useTheme } from "@emotion/react";

const AdminHeader = () => {
  const theme = useTheme();
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
  const drawerWidth = 260;
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        background: "#fff",
        borderBottom: "1px solid #DFDFDF",
      }}
    >
      <Toolbar>
        <Grid
          item
          container
          flexWrap={"nowrap"}
          alignItems="center"
          sx={{
            transition: theme.transitions.create("order"),
            gap: { xs: 1 },
          }}
        >
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
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
