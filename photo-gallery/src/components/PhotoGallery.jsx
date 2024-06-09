import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { createClient } from "pexels";
import { PhotoCard } from "./PhotoCard";
import { Pagination } from "./Pagination";
import { Loader } from "./Loader";

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const client = createClient(
    "mwP3JgDRdHDMyGWYuBvtKlLjqBPAVKqX8ASPSaBBA8Ye683iUp5qCp9Y"
  );

  const fetchPhotos = async (page) => {
    setLoading(true);
    const response = await client.photos.curated({ per_page: 12, page });
    setTimeout(() => {
      setPhotos(response.photos);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchPhotos(page);
  }, [page]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={2}>
            {photos.map((photo) => (
              <Grid item key={photo.id} xs={12} sm={6} md={4}>
                <PhotoCard photo={photo} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            page={page}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </>
      )}
    </>
  );
};
