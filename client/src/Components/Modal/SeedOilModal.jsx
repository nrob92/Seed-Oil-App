import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Box, Button, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function SeedOilModal({ place, setSeedOilModal }) {
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

  const imgSlice = place.photos.slice(0, 4);

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

        <Box>
          <ImageList variant="masonry" cols={4} gap={8}>
            {imgSlice.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    height: "200px",
                    objectFit: "cover",
                    margin: "auto",
                  }}
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
          <Alert severity="success">User description: {place.input}</Alert>
          <Alert severity="success">User Input: {place.select}</Alert>
          <Alert severity="success">Contacted by Username: {place.user}</Alert>
        </Stack>

        {place.imgFile && (
          <Stack
            marginTop={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            <Alert severity="success">Email Proof:</Alert>
            <img
              component="img"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
              src={place.imgFile}
            />
          </Stack>
        )}
      </Card>
    </div>
  );
}
