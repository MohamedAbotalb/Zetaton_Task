import React, { useState } from "react";
import { Grid, Card, CardMedia, Typography } from "@mui/material";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([
    "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg",
    "https://images.pexels.com/photos/25772450/pexels-photo-25772450.jpeg",
  ]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Favorites
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((photoUrl, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={photoUrl}
                alt="Favorite"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
