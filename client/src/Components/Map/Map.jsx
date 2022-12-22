import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
//import { useLoadScript } from "@react-google-maps/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Paper, Typography } from "@mui/material";
import "../Map/mapStyles.css";
import Rating from "@mui/material/Rating";
import mapStyles from "./mapStyles";
import AppContext from "../../Contexts/AppContext";
import { useContext } from "react";
import Modal from "../Modal/Modal";
import Box from "@mui/material/Box";

const Map = ({ places }) => {
  const [open, setOpen] = React.useState(false);

  const [modal, setModal] = useState([]);
  const { setCoords, coords, setBounds, setChildClicked } =
    useContext(AppContext);
  const isDesktop = window.matchMedia("(max-width: 600px)");
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  // });
  // if (!isLoaded) return <div>Loaing...</div>;

  const filterName = (name) => {
    setModal([name]);
    setOpen(true);
  };

  return (
    <div
      style={{
        height: "90vh",

        padding: "25px",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={coords}
        defaultZoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places?.map((place, i) => (
          <div
            onClick={() => filterName(place)}
            className="markerContainer"
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {isDesktop.matches ? (
              <LocationOnIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className="paper">
                <Typography
                  className="typography"
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  src={
                    place.photo
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
        ))}

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
      </GoogleMapReact>
    </div>
  );
};

export default Map;
