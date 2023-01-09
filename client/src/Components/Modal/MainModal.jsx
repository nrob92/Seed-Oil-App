import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Button, Stack, Box, Link } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const MainModal = ({ place, setOpen, openModalRating, setOpenModalRating }) => {
  const toggleModals = () => {
    setOpenModalRating(!openModalRating);
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

        <Alert sx={{ mt: 1 }} severity="error">
          Assume the worst, nearly all restaraunts use seed oils.
        </Alert>
        <Stack
          marginTop={2}
          direction="row"
          justifyContent="center"
          spacing={4}
        >
          <Button onClick={toggleModals} variant="contained">
            File Report
          </Button>
          <Button variant="contained">{place.phone}</Button>

          <Link href={place.website} target="_blank">
            <Button variant="contained">Website</Button>
          </Link>
        </Stack>
      </Card>
    </div>
  );
};

export default MainModal;
