import React from "react";
import GoogleMapReact from "google-map-react";
import { useLoadScript } from "@react-google-maps/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Paper, Typography } from "@mui/material";
import "../Map/mapStyles.css";
import Rating from "@mui/material/Rating";
import mapStyles from "./mapStyles"

const Map = ({ setCoords, setBounds, coords, places, setChildClicked }) => {
  const isDesktop = window.matchMedia("(max-width: 600px)");
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  // });
  // if (!isLoaded) return <div>Loaing...</div>;

  return (
    <div
      style={{
        height: "90vh",
        width: "100%",
        padding: "25px",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={coords}
        defaultCenter={coords}
        defaultZoom={14}
        options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
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
      </GoogleMapReact>
    </div>
  );
};

export default Map;
