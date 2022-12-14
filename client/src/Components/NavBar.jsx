import * as React from "react";
import { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { AppContext } from "../Contexts/AppContext";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {
  const {
    loggedIn,
    setLoggedIn,
    setAllValues,
    allValues,
    setRestaurantData,
    restaurantData,
    setCoords,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [autocomplete, setAutocomplete] = useState(null);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
    setLoggedIn(false);
  };

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = async () => {
    const lat = await autocomplete.getPlace().geometry.location.lat();
    const lng = await autocomplete.getPlace().geometry.location.lng();
    const photos = await autocomplete.getPlace().photos.map((x) => x.getUrl());
    const name = await autocomplete.getPlace().name;
    const rating = await autocomplete.getPlace().rating;
    const website = await autocomplete.getPlace().website;
    const address = await autocomplete.getPlace().formatted_address;
    const phone = await autocomplete.getPlace().formatted_phone_number;
    const placeId = await autocomplete.getPlace().place_id;
    const price = await autocomplete.getPlace().price_level;
    const open = await autocomplete.getPlace().current_opening_hours.open_now;
    const hours = await autocomplete
      .getPlace()
      .current_opening_hours.periods.map((hour) => hour);
    setCoords({ lat, lng });
    setAllValues({
      lat,
      lng,
      photos,
      name,
      rating,
      website,
      address,
      placeId,
      phone,
      price,
      open,
      hours,
    });
  };

  React.useEffect(() => {
    const sendData = async () => {
      if (allValues?.name?.length > 3) {
        try {
          let response = await axios.post(
            `${process.env.REACT_APP_LOCAL_HOST}postRestaurantData`,
            {
              lat: allValues.lat,
              lng: allValues.lng,
              photos: allValues.photos,
              name: allValues.name,
              rating: allValues.rating,
              website: allValues.website,
              address: allValues.address,
              phone: allValues.phone,
              price: allValues.price,
              open: allValues.open,
              hours: allValues.hours,
              placeId: allValues.placeId,
            }
          );
          setRestaurantData([response.data, ...restaurantData]);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    sendData();
  }, [allValues]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Stack direction="row" spacing={2}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <StyledInputBase
                  placeholder="Location???"
                  inputProps={{ "aria-label": "search" }}
                />
              </Autocomplete>
            </Search>
            {loggedIn ? (
              <Button onClick={logOut} variant="contained">
                Logout
              </Button>
            ) : (
              <Button variant="contained">Login</Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
