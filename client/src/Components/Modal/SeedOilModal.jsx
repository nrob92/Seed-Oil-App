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

        <div>
          <img
            component="img"
            style={{ maxWidth: "200px", height: "auto" }}
            src={place.imgFile}
          />
        </div>
        <Box sx={{ overflowY: "scroll" }}>
          <ImageList variant="masonry" cols={2} gap={8}>
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
