import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Box, Button, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function SeedOilModal({ place, setSeedOilModal }) {
  const firstFour = place.photos.slice(0, 5);

  const AlertComponent = () => {
    if (place.userRating <= 1) {
      return (
        <Alert sx={{ marginTop: "5px" }} severity="error">
          terrible
        </Alert>
      );
    }
    if (place.userRating <= 2.5) {
      return (
        <Alert sx={{ marginTop: "5px" }} severity="warning">
          bad
        </Alert>
      );
    }
    if (place.userRating <= 3.5) {
      return (
        <Alert sx={{ marginTop: "5px" }} severity="info">
          ok
        </Alert>
      );
    }
    if (place.userRating <= 4) {
      return (
        <Alert sx={{ marginTop: "5px" }} severity="success">
          good
        </Alert>
      );
    }
    if (place.userRating > 4) {
      return (
        <Alert sx={{ marginTop: "5px" }} variant="filled" severity="success">
          Best!!!
        </Alert>
      );
    }
  };

  return (
    <div>
      <Card sx={{ p: 3 }}>
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

        <div>
          <img
            component="img"
            style={{ maxWidth: "200px", height: "auto" }}
            src={place.imgFile}
          />
        </div>
        <Box>
          <ImageList variant="masonry" cols={4} gap={8}>
            {firstFour.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item}?w=248&fit=crop&auto=format`}
                  srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <AlertComponent />
        <Stack marginTop={2} direction="row" justifyContent="space-between">
          <Typography variant="h6">post from User: {place.input}</Typography>
          <Typography variant="h6">User Input: {place.select}</Typography>
          <Typography variant="h6">Contacted by: {place.user}</Typography>
        </Stack>
      </Card>
    </div>
  );
}
