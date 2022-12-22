import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Button, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";

export default function ModalReport({ restaurant, setOpen }) {
  return (
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
        title={restaurant.name}
        subheader={restaurant.address}
      />
      <Rating
        size="small"
        precision={0.5}
        value={Number(restaurant.rating)}
        readOnly
      ></Rating>
      <CardMedia
        component="img"
        height="194"
        image={
          restaurant.photo
            ? restaurant.photo.images.large.url
            : "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-restaurant-logo-template-design-restaurant-logo-with-modern-frame-isolated-png-image_887423.jpg"
        }
        alt={restaurant.name}
      />

      <Alert sx={{ p: 0, mt: 1 }} severity="error">
        Assume the worst
      </Alert>
      <label>Nearly all restaurants use seed oils.</label>
      <Stack
        marginTop={2}
        direction="row"
        justifyContent="space-evenly"
        spacing={2}
      >
        <Button variant="contained">File Report</Button>
        <Button variant="contained">{restaurant.phone}</Button>
      </Stack>
    </Card>
  );
}
