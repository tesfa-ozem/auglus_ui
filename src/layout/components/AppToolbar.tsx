import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AppToolbar = () => {
    const {logout } = useAuth();
    const navigate = useNavigate();
  // State to handle the profile menu anchor
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Handle profile menu open
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle profile menu close
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  // Dummy user information for the avatar (can be replaced with actual user data)
  const user = {
    name: "John Doe",
    avatarUrl: "https://example.com/avatar.png", // Replace with the URL of the user's avatar image
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Your Logo
        </Typography>
        <Button color="inherit">Dashboard</Button>
        <Button color="inherit">Tasks</Button>
        <Button color="inherit">Professionals</Button>
        {/* Profile Button */}
        <IconButton color="inherit" onClick={handleProfileMenuOpen}>
          <Avatar alt={user.name} src={user.avatarUrl} />
        </IconButton>
        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem>
          <MenuItem onClick={()=>logout()}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
