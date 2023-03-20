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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Drawers = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(0);

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
      id: 3,
      name: "Messages",
      link: "/messages",
      icon: MessageOutlined,
    },
    {
      id: 4,
      name: "History",
      link: "/history",
      icon: HistoryOutlined,
    },
  ];
  const drawerWidth = 260;
  const purple = "AE01FF";
  // useEffect(() => {
  //   setId();
  // }, []);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        p: 2,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
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
          // noWrap
          to="/dashboard"
          sx={{ textDecoration: "none", color: "#000" }}
        >
          MILE 12
        </Typography>
      </Toolbar>

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          px: "1.6rem",
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
                background: "#AE01FF",
                color: "#fff",
              },
              display: "block",
              color: "#292D32",
              transition: "color 1ms ease-in",
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
                },
                // minHeight: 48,
                // justifyContent: open ? "initial" : "center",
                px: 2.5,
                "& .Mui-selected": {
                  color: "#fff",
                  background: purple,
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
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                <text.icon sx={{ fontSize: "2.5rem", color: "inherit" }} />
              </ListItemIcon>
              <ListItemText
                primary={text.name}
                primaryTypographyProps={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Drawers;
