import React from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import AppContext from "../../Contexts/AppContext";
import Rating from "@mui/material/Rating";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Button, Divider, Stack, Typography } from "@mui/material";

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const FormModal = ({ place, setOpen }) => {
  const [rating, setRating] = React.useState(0);
  const [select, setSelect] = React.useState("");
  const [input, setInput] = React.useState("");
  const [userData, setUserData] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [imgFile, setImgFile] = React.useState("");
  const { setSeedOilData, seedOilData } = React.useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postSeedOilData(input, select, rating, imgFile);
    console.log("uploaded");
  };

  const postSeedOilData = async (input, select, rating, imgFile) => {
    let response = await axios.post(`${process.env.REACT_APP_LOCAL_HOST}post`, {
      select,
      input,
      rating,
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
      photo: place.photo ? place.photo.images.large.url : "",
      imgFile,
      user: userData.user,
    });

    setSeedOilData([response.data, ...seedOilData]);
    setInput("");
    setSelect("");
    setImgFile("");
    setOpen(false);
  };

  const getUserData = async () => {
    let response = await axios.get(
      `${process.env.REACT_APP_LOCAL_HOST}getUser`,
      {
        withCredentials: true,
      }
    );
    setUserData(response.data);
    setChecked(true);
  };
  console.log(userData);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setImgFile(base64);
  };

  return (
    <div>
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
            title={place.name}
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
            <InputLabel id="demo-simple-select-label">Select Source</InputLabel>
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
              <MenuItem value={"Kitchen Confirmed"}>Kitchen Confirmed</MenuItem>
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
          </Stack>
          <label
            htmlFor="file-upload"
            id="demo-simple-select-label"
            className="custom-file-upload"
          ></label>
          <input
            type="file"
            label="Image"
            variant="outlined"
            name="myFile"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          />
          {checked ? (
            userData.user
          ) : (
            <Stack direction="row">
              <Button
                sx={{ width: 30 }}
                onClick={getUserData}
                variant="contained"
              ></Button>
              <Typography variant="subtitle2">
                click button if you have contacted restaraunt
              </Typography>
            </Stack>
          )}

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default FormModal;
