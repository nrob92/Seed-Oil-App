import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Button, Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";

export default function SeedOilModal({ restaurant, setSeedOilModal }) {
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
          title={restaurant.name}
          subheader={restaurant.address}
        />
        <Rating
          size="small"
          precision={0.5}
          value={Number(restaurant.rating)}
          readOnly
        ></Rating>

        <CardMedia component="img" height="194" src={restaurant.imgFile} />

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
          {" "}
          <Typography>{restaurant.input}</Typography>
          <Typography>{restaurant.select}</Typography>
        </Stack>
      </Card>
    </div>
  );
}
