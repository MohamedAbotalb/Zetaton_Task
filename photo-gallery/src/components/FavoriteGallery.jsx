import React from "react";
import { Grid, Typography } from "@mui/material";
import FavoriteCard from "./FavoriteCard";
import { Pagination } from "../components/Pagination";

// Create a favorite photo gallery component to show all favorite photos with the pagination
export const FavoriteGallery = ({
  favorites,
  page,
  pageSize,
  handlePrev,
  handleNext,
  removeFavorite,
}) => {
  const displayedFavorites = favorites.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <>
      {favorites.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {displayedFavorites.map((photoUrl, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <FavoriteCard
                  photoUrl={photoUrl}
                  onRemove={() => removeFavorite(index)}
                />
              </Grid>
            ))}
          </Grid>
          {favorites.length > pageSize && (
            <Pagination
              page={page}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          )}
        </>
      ) : (
        <Typography variant="h6" color="textSecondary">
          No favorite photos to show.
        </Typography>
      )}
    </>
  );
};
