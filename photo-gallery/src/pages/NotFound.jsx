import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh"
      textAlign="center"
    >
      <Typography variant="h1" fontSize="3rem" sx={{ mb: 2 }}>
        404 - Not Found
      </Typography>
      <Typography variant="body1" fontSize="1rem" sx={{ mb: 3 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Box>
  );
};
