import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SeedOilMap = ({ place }) => {
  const isDesktop = window.matchMedia("(max-width: 600px)");
  return (
    <div className="markerContainer">
      {isDesktop.matches ? (
        <LocationOnIcon color="primary" fontSize="large" />
      ) : (
        <Paper
          elevation={3}
          className="paper"
        >
          <Typography className="typography" variant="subtitle2" gutterBottom>
            {place.name}
          </Typography>
          <CheckCircleIcon/>
          <img
            src={
              place
                ? place.photo
                : "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-restaurant-logo-template-design-restaurant-logo-with-modern-frame-isolated-png-image_887423.jpg"
            }
            alt={place.name}
            className="pointer"
          />
          <Rating
            size="small"
            precision={0.5}
            value={Number(place.rating)}
            readOnly
          ></Rating>
        </Paper>
      )}
    </div>
  );
};

export default SeedOilMap;
