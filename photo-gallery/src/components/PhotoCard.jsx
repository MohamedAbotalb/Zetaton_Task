import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { AddToFavoritesButton } from "./AddToFavoritesButton";

export const PhotoCard = ({ photo }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={photo.src.large}
        alt={photo.photographer}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="textSecondary" component="p">
          Photo by{" "}
          <span style={{ fontWeight: "bold" }}>{photo.photographer}</span> on
          Pexels
        </Typography>
        <AddToFavoritesButton photoUrl={photo.src.large} />
      </CardContent>
    </Card>
  );
};
