import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Button, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";

export default function SeedOilModal({ place, setSeedOilModal }) {
  return (
    <div>
      <Card sx={{ maxWidth: 345, p: 3 }}>
        <CardHeader
          action={
            <Button
              variant="contained"
              size="small"
              onClick={() => setSeedOilModal(false)}
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
          value={Number(place.userRating)}
          readOnly
        ></Rating>

        <img
          component="img"
          style={{ maxWidth: "100%", height: "auto" }}
          src={place.imgFile}
        />
        <img
          style={{ maxWidth: "100%", height: "auto" }}
          src={
            place
              ? place.photos[4]
              : "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-restaurant-logo-template-design-restaurant-logo-with-modern-frame-isolated-png-image_887423.jpg"
          }
          alt={place.name}
          className="pointer"
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
          {" "}
          <Typography>{place.input}</Typography>
          <Typography>{place.select}</Typography>
        </Stack>
      </Card>
    </div>
  );
}
