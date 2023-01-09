import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper, Typography, Box, Drawer } from "@mui/material";
import Modal from "../Modal/Modal";
import Rating from "@mui/material/Rating";
import SeedOilMap from "../SeedOilMap/SeedOilMap";

const PlacesMap = ({ place }) => {
  const isDesktop = window.matchMedia("(max-width: 650px)");
  const [open, setOpen] = React.useState(false);
  const [modal, setModal] = React.useState([]);
  const filterName = (name) => {
    setModal([name]);
    setOpen(true);
  };

  return (
    <div>
      {place.userRating ? (
        <SeedOilMap place={place} />
      ) : (
        <div onClick={() => filterName(place)} className="markerContainer">
          {isDesktop.matches ? (
            <LocationOnIcon color="primary" fontSize="large" />
          ) : (
            <Paper elevation={10} className="paper">
              <Typography textAlign="center" fontSize={12} variant="subtitle2">
                {place.name}
              </Typography>

              <img
                style={{
                  width: "75px",
                  height: "75px",
                  objectFit: "cover",
                  margin: "auto",
                }}
                src={
                  place.photos
                    ? place.photos[0]
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
      )}

      {open && (
        <>
          {modal.map((place, i) => {
            return (
              <Drawer
                open={open}
                onClose={() => setOpen(false)}
                key={i}
                anchor="bottom"
              >
                <Box className="modal" role="presentation">
                  <Modal setOpen={setOpen} place={place} />
                </Box>
              </Drawer>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PlacesMap;
