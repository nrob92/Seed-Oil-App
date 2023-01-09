import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper, Typography, Box, Drawer } from "@mui/material";
import Rating from "@mui/material/Rating";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SeedOilModal from "../Modal/SeedOilModal";

const SeedOilMap = ({ place }) => {
  const isDesktop = window.matchMedia("(max-width: 600px)");
  const [seedOilModal, setSeedOilModal] = React.useState(false);
  const [modal, setModal] = React.useState([]);
  const filterName = (name) => {
    setModal([name]);
    setSeedOilModal(true);
  };
  return (
    <div>
      <div onClick={() => filterName(place)} className="markerContainer">
        {isDesktop.matches ? (
          <LocationOnIcon color="primary" fontSize="large" />
        ) : (
          <Paper
            sx={{ backgroundColor: "green" }}
            elevation={3}
            className="paper"
          >
            <Typography textAlign="center" fontSize={12} variant="subtitle2">
              {place.name}
            </Typography>
            <CheckCircleIcon />
            <img
              style={{
                width: "75px",
                height: "75px",
                objectFit: "cover",
                margin: "auto",
              }}
              src={
                place
                  ? place.photos[0]
                  : "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-restaurant-logo-template-design-restaurant-logo-with-modern-frame-isolated-png-image_887423.jpg"
              }
              alt={place.name}
              className="pointer"
            />
            <Rating
              size="small"
              precision={0.5}
              value={Number(place.userRating)}
              readOnly
            ></Rating>
          </Paper>
        )}
      </div>
      {seedOilModal && (
        <>
          {modal.map((place, i) => {
            return (
              <Drawer
                open={seedOilModal}
                onClose={() => setSeedOilModal(false)}
                key={i}
                anchor="bottom"
              >
                <Box>
                  <SeedOilModal
                    setSeedOilModal={setSeedOilModal}
                    place={place}
                  />
                </Box>
              </Drawer>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SeedOilMap;
