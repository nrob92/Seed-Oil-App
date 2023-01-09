import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Rating from "@mui/material/Rating";
import "../PlaceDetails/placeDetailsStyle.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Card ref={refProp} sx={{ margin: 1 }} elevation={6}>
      <img
        style={{ backgroundSize: "cover", width: "100%" }}
        title={place.name}
        src={
          place.photos
            ? place.photos[0]
            : "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-restaurant-logo-template-design-restaurant-logo-with-modern-frame-isolated-png-image_887423.jpg"
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Price</Typography>
          <Rating
            name="text-feedback"
            value={place.price}
            readOnly
            precision={0.5}
            icon={<AttachMoneyIcon fontSize="inherit" />}
            emptyIcon={<AttachMoneyIcon fontSize="inherit" />}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Rating</Typography>
          <Rating
            value={Number(place.rating)}
            precision={0.5}
            readOnly
          ></Rating>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">Address</Typography>

          <Typography variant="subtitle2" fontSize="10px" color="textSecondary">
            <LocationOnIcon /> {place.address}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">Phone</Typography>

          <Typography gutterBottom variant="subtitle2" color="textSecondary">
            <PhoneIcon /> {place.phone}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
