import React from "react";
import { Button } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

export const AddToFavoritesButton = ({ photoUrl }) => {
  const addToFavorites = (photoUrl) => {
    // TODO Handle add to favorites logic here
    alert("Add to favorites functionality not implemented yet.");
  };

  return (
    <Button onClick={() => addToFavorites(photoUrl)}>
      <FavoriteBorder />
    </Button>
  );
};
