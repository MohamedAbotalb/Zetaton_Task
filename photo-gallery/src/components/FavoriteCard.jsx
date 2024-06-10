import React from "react";
import { Card, CardMedia, IconButton, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Create a favorite photo card component to show the photo with the delete icon
const FavoriteCard = ({ photoUrl, onRemove }) => {
  return (
    <Card>
      <CardMedia component="img" height="300" image={photoUrl} alt="Favorite" />
      <CardActions>
        <IconButton aria-label="delete" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FavoriteCard;
