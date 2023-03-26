import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DashboardCustomizeOutlined,
  PersonAddAlt1Outlined,
  HistoryOutlined,
  MessageOutlined,
} from "@mui/icons-material";
import { useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Drawers = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const location = useLocation();

  const sidebarItem = [
    {
      id: 0,
      name: "Dashboard",
      link: "/admin",
      icon: DashboardCustomizeOutlined,
    },

    {
      id: 1,
      name: "Products",
      link: "/products",
      icon: PersonAddAlt1Outlined,
    },

    {
      id: 2,
      name: "Messages",
      link: "/messages",
      icon: MessageOutlined,
    },
    {
      id: 3,
      name: "History",
      link: "/history",
      icon: HistoryOutlined,
    },
  ];
  useLayoutEffect(() => {
    sidebarItem.map((item) => {
      if (item.link === location.pathname) {
        setId(item.id);
      }
      return null;
    });
    //eslint-disable-next-line
  }, [location.pathname]);

  const mlDrawerWidth = 260;
  const smDrawerWidth = 200;

  const xsDrawerWidth = 60;
  const purple = "AE01FF";

  return (
    <Drawer
      sx={{
        width: { md: mlDrawerWidth, sm: smDrawerWidth, xs: xsDrawerWidth },
        flexShrink: 0,
        p: 2,
        "& .MuiDrawer-paper": {
          width: { md: mlDrawerWidth, sm: smDrawerWidth, xs: xsDrawerWidth },
          background: "#EFEFEF",
          boxSizing: "border-box",
          border: 0,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography
          component={Link}
          variant="h2"
          noWrap
          to="/dashboard"
          sx={{ textDecoration: "none", color: "#000" }}
          title="MILE 12"
        >
          MILE 12
        </Typography>
      </Toolbar>

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          px: { xs: 0, sm: "1.6rem" },
        }}
        dense
      >
        {sidebarItem.map((text, index) => (
          <ListItem
            key={text.id}
            disablePadding
            sx={{
              mb: 2,
              "&:hover, & .Mui-selected": {
                backgroundColor: "#AE01FF ",
                color: "#fff",
              },
              display: "block",
              color: "#292D32",
            }}
          >
            <ListItemButton
              selected={id === index}
              sx={{
                "& .MuiListItemButton": {
                  color: "inherit",
                  "&:hover": {
                    color: purple,
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#AE01FF",
                    color: "#fff",
                  },
                },
                // minHeight: 48,
                // justifyContent: open ? "initial" : "center",
                px: { xs: 2, sm: 2.5 },
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundColor: "#AE01FF",
                },
              }}
              onClick={() => {
                setId(index);
                navigate(text.link);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: "inherit",

                  "&:hover": {
                    color: purple,
                  },
                  mr: { xs: 0, sm: 3 },
                  justifyContent: "center",
                }}
                title={text.name}
              >
                <text.icon sx={{ fontSize: "2.5rem", color: "inherit" }} />
              </ListItemIcon>
              <ListItemText
                primary={text.name}
                primaryTypographyProps={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                }}
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Drawers;
