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
import { Button, Divider, Stack, Typography, Box } from "@mui/material";

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
  const [userRating, setUserRating] = React.useState(0);
  const [select, setSelect] = React.useState("");
  const [input, setInput] = React.useState("");
  const [userData, setUserData] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [imgFile, setImgFile] = React.useState("");
  const { setSeedOilData, seedOilData, restaurantData } =
    React.useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    postSeedOilData(input, select, userRating, imgFile);
    console.log("uploaded");
  };

  const postSeedOilData = async (input, select, userRating, imgFile) => {
    let response = await axios.post(
      `${process.env.REACT_APP_LOCAL_HOST}postSeedOilData`,
      {
        select,
        input,
        userRating,
        imgFile,
        user: userData.user,
        id: place._id,
      }
    );

    setSeedOilData([response.data, ...restaurantData]);
    setInput("");
    setSelect("");
    setImgFile("");
    setOpen(false);
  };
  console.log(seedOilData);
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const base64 = await convertToBase64(file);
    setImgFile(base64);
  };

  const AlertComponent = () => {
    if (userRating <= 1) {
      return (
        <Alert sx={{ flexDirection: "row" }} severity="error">
          terrible
        </Alert>
      );
    }
    if (userRating <= 2.5) {
      return (
        <Alert sx={{ flexDirection: "row" }} severity="warning">
          bad
        </Alert>
      );
    }
    if (userRating <= 3.5) {
      return (
        <Alert sx={{ flexDirection: "row" }} severity="info">
          ok
        </Alert>
      );
    }
    if (userRating <= 4) {
      return (
        <Alert sx={{ flexDirection: "row" }} severity="success">
          good
        </Alert>
      );
    }
    if (userRating > 4) {
      return (
        <Alert
          sx={{ flexDirection: "row" }}
          variant="filled"
          severity="success"
        >
          Best!!!
        </Alert>
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      <form
        style={{
          border: "1px solid",
          borderRadius: "5px",
          maxWidth: "600px",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <Card elevation={10} sx={{ p: 2 }}>
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography variant="h5">{place.name}</Typography>

            <Button
              variant="contained"
              size="small"
              onClick={() => setOpen(false)}
            >
              X CLOSE
            </Button>
          </Stack>
          <Stack
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            gap={2}
            sx={{ flexDirection: "column" }}
          >
            <Rating
              name="simple-controlled"
              value={userRating}
              onChange={(event, newValue) => {
                setUserRating(newValue);
              }}
            />
            <AlertComponent />
            <Divider sx={{ borderBottomWidth: "3px" }} />
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Select Source
              </InputLabel>
              <Select
                sx={{ pl: 2 }}
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
            <Divider sx={{ borderBottomWidth: "3px" }} />

            <TextField
              inputProps={{
                style: {
                  marginLeft: 20,
                },
              }}
              id="outlined-basic"
              label="Source Body"
              variant="outlined"
              name="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
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
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button onClick={getUserData} variant="contained">
                  userName
                </Button>
                <Typography variant="subtitle2">
                  click username button if you have contacted restaraunt
                </Typography>
              </Stack>
            )}
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Card>
      </form>
    </Box>
  );
};

export default FormModal;
