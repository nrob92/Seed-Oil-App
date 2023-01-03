import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Button, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";

const MainModal = ({ place, setOpen, openModalRating, setOpenModalRating }) => {
  const toggleModals = () => {
    setOpenModalRating(!openModalRating);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345, p: 3 }}>
        <CardHeader
          action={
            <Button
              variant="contained"
              size="small"
              onClick={() => setOpen(false)}
            >
              X CLOSE
            </Button>
          }
          title={place.name}
          subheader={place.address}
        />
        <Rating
          size="small"
          precision={0.5}
          value={Number(place.rating)}
          readOnly
        ></Rating>
        <img
          component="img"
          style={{ maxWidth: "100%", height: "auto" }}
          src={
            place.photos
              ? place.photos[4]
              : "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-restaurant-logo-template-design-restaurant-logo-with-modern-frame-isolated-png-image_887423.jpg"
          }
          alt={place.name}
        />

        <Alert sx={{ p: 0, mt: 1 }} severity="error">
          Assume the worst
        </Alert>
        <label>Nearly all restaraunts use seed oils.</label>
        <Stack
          marginTop={2}
          direction="row"
          justifyContent="space-evenly"
          spacing={2}
        >
          <Button onClick={toggleModals} variant="contained">
            File Report
          </Button>
          <Button variant="contained">{place.phone}</Button>
        </Stack>
      </Card>
    </div>
  );
};

export default MainModal;
