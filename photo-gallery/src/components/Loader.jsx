import React from "react";
import { Bars } from "react-loader-spinner";
import { Box } from "@mui/material";

export function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Bars
        height="80"
        width="80"
        color="#0d6efd"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
}
