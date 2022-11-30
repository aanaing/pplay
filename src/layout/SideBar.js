import React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Box, Avatar } from "@mui/material";
import logo from "../static/logo192.png";

import { Link } from "react-router-dom";
const drawerWidth = 340;

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
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader sx={{}}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Avatar alt="PowerPlay" src={logo} className="nav-logo" />
        </Box>
        {/* <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton> */}
      </DrawerHeader>
      {/* <Divider /> */}
      <List className="nav-list">
        <Link to="/users" className="nav-link">
          <ListItem button className="nav-btn">
            <ListItemIcon>
              <AccountCircleIcon className="nav-link-icon" />
            </ListItemIcon>
            Users
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default SideBar;
