import React from "react";
import { Button } from "@mui/material";

export const Pagination = ({ page, handlePrev, handleNext }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "40px 0",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrev}
        disabled={page === 1}
        sx={{ mr: 3 }}
      >
        Prev
      </Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};
