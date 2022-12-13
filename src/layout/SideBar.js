import React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import logo from "../static/PPlay_logo.png";
import { Link } from "react-router-dom";
import "../style/App.css";

const drawerWidth = 320;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBar = ({ open }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e1e1e",
        },
      }}
      className="sidebar"
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            p: 1.3,
            width: "270px",
            height: "50px",
            backgroundColor: "#fff",
            borderRadius: "40px",
            m: 3,
            boxShadow: 10,
          }}
        >
          <img src={logo} alt="power play" width="250px" height="28px" />
        </Box>
      </DrawerHeader>
      <List className="nav-list" style={{ fontSize: "18px" }}>
        <Link to="/" className="nav-link">
          <ListItem button className="nav-btn">
            <ListItemIcon>
              <AccountCircleIcon
                sx={{ fontSize: "27px" }}
                className="nav-link-icon"
              />
            </ListItemIcon>
            Users
          </ListItem>
        </Link>
        <Link to="/video" className="nav-link">
          <ListItem button className="nav-btn">
            <ListItemIcon>
              <PlayCircleFilledIcon
                sx={{ fontSize: "27px" }}
                className="nav-link-icon"
              />
            </ListItemIcon>
            Video
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default SideBar;
