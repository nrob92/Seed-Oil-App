import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
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
          value={Number(place.rating)}
          readOnly
        ></Rating>

        <CardMedia component="img" height="194" src={place.imgFile} />

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
          <Typography>{place.user}</Typography>
        </Stack>
      </Card>
    </div>
  );
}
