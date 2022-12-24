import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper, Typography, Box } from "@mui/material";
import Modal from "../Modal/Modal";
import Rating from "@mui/material/Rating";

const PlacesMap = ({ place }) => {
  const isDesktop = window.matchMedia("(max-width: 600px)");
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState([]);
  const filterName = (name) => {
    setModal([name]);
    setOpen(true);
  };

  return (
    <div>
      <div onClick={() => filterName(place)} className="markerContainer">
        {isDesktop.matches ? (
          <LocationOnIcon color="primary" fontSize="large" />
        ) : (
          <Paper elevation={3} className="paper">
            <Typography className="typography" variant="subtitle2" gutterBottom>
              {place.name}
            </Typography>
            <img
              src={
                place
                  ? place.photo.images.large.url
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

      {open && (
        <>
          {modal.map((restaurant, i) => {
            return (
              <Box key={i} className="modal">
                <Modal setOpen={setOpen} restaurant={restaurant} />
              </Box>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PlacesMap;
