import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Button, Divider, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import AppContext from "../../Contexts/AppContext";

export default function Modal({ restaurant, setOpen }) {
  const [openModalRating, setOpenModalRating] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [select, setSelect] = React.useState("");
  const [input, setInput] = React.useState("");
  const { setSeedOilData, seedOilData } = React.useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postSeedOilData(input, select, rating);
  };

  const postSeedOilData = async (input, select, rating) => {
    let response = await axios.post(`${process.env.REACT_APP_LOCAL_HOST}post`, {
      select,
      input,
      rating,
      name: restaurant.name,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      photo: restaurant.photo ? restaurant.photo.images.large.url : "",
    });

    setSeedOilData([response.data, ...seedOilData]);
    setOpen(false);
    setInput("");
    setSelect("");
  };

  const toggleModals = () => {
    setOpenModalRating(!openModalRating);
  };

  return (
    <div>
      {!openModalRating ? (
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
            <Button onClick={toggleModals} variant="contained">
              File Report
            </Button>
            <Button variant="contained">{restaurant.phone}</Button>
          </Stack>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card elevation={10} sx={{ maxWidth: 345, p: 3 }}>
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
            />

            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />

            <Alert sx={{ p: 0, mt: 1 }} severity="error">
              Assume the worst
            </Alert>

            <Divider sx={{ borderBottomWidth: "3px", mt: 2 }} />
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Source
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Source"
                value={select}
                name="select"
                onChange={(e) => setSelect(e.target.value)}
              >
                <MenuItem value={"Visible Kitchen"}>Visible Kitchen</MenuItem>
                <MenuItem value={"Kitchen Confirmed"}>
                  Kitchen Confirmed
                </MenuItem>
                <MenuItem value={"In Writing"}>In Writing</MenuItem>
              </Select>
            </FormControl>
            <Divider sx={{ borderBottomWidth: "3px", mt: 2 }} />

            <Stack
              marginTop={2}
              direction="row"
              justifyContent="space-evenly"
              spacing={2}
            >
              <TextField
                id="outlined-basic"
                label="Source Body"
                variant="outlined"
                name="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Card>
        </form>
      )}
    </div>
  );
}
