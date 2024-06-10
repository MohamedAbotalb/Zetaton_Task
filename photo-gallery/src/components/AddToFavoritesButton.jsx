import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useUser } from "../contexts/UserContext";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

// Create a component of AddToFavorites functionality
export const AddToFavoritesButton = ({ photoUrl }) => {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  // Get the user favorite photos from the database and check if the wanted photo is present or not in the favorites array
  useEffect(() => {
    if (user) {
      const checkFavoriteStatus = async () => {
        try {
          const userDocRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userFavorites = userDoc.data().favorites || [];
            setIsFavorite(userFavorites.includes(photoUrl));
          }
        } catch (error) {
          console.error("Failed to check favorite status", error);
        }
      };

      checkFavoriteStatus();
    }
  }, [user, photoUrl]);

  // Add a toggle functionality to add the ability to add and remove the photo to the favorites from the same button
  // and if the photo is added to favorites show icon as filled and if removed show icon as not filled
  const toggleFavorite = async () => {
    if (!user) {
      toast.error("You must be logged in to add favorites");
      return;
    }

    try {
      const userDocRef = doc(db, "Users", user.uid);

      if (isFavorite) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(photoUrl),
        });
        setIsFavorite(false);
        toast.success("Photo removed from favorites!");
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(photoUrl),
        });
        setIsFavorite(true);
        toast.success("Photo added to favorites!");
      }
    } catch (error) {
      toast.error("Failed to update favorites");
    }
  };

  return (
    <Button onClick={toggleFavorite}>
      {isFavorite ? <Favorite /> : <FavoriteBorder />}
    </Button>
  );
};
