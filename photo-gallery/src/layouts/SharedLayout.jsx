import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "20px" }}>
        <Outlet />
      </Container>
    </>
  );
};
