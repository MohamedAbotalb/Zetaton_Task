import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "16px",
              }}
            >
              Pexels Photo Gallery
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </Box>
          <Box>
            <Button color="inherit" component={Link} to="/favorites">
              Favorites
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
