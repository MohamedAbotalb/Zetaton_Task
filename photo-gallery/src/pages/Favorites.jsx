import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useUser } from "../contexts/UserContext";
import { Loader } from "../components/Loader";
import { FavoriteGallery } from "../components/FavoriteGallery";

export const Favorites = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 12;

  const fetchFavorites = async () => {
    setLoading(true);
    const userDoc = await getDoc(doc(db, "Users", user.uid));
    setTimeout(() => {
      setFavorites(userDoc.data().favorites || []);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const removeFavorite = async (index) => {
    const updatedFavorites = favorites.filter((pre, i) => i !== index);
    setFavorites(updatedFavorites);
    await updateDoc(doc(db, "Users", user.uid), {
      favorites: updatedFavorites,
    });
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev * pageSize < favorites.length ? prev + 1 : prev));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Favorites
          </Typography>
          <FavoriteGallery
            favorites={favorites}
            page={page}
            pageSize={pageSize}
            handlePrev={handlePrev}
            handleNext={handleNext}
            removeFavorite={removeFavorite}
          />
        </>
      )}
    </>
  );
};
