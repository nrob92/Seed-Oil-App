import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Map from "../Components/Map/Map";
import { Grid } from "@mui/material";
import List from "../Components/List/List";
import { getPlacesData } from "../api";
import { AppContext } from "../Contexts/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {
    setLoggedIn,
    setCoords,
    filteredPlaces,
    setFilteredPlaces,
    places,
    setPlaces,
    bounds,
    setIsLoading,
    rating,
    search,
    setSearch,
  } = useContext(AppContext);

  // checks to see if youre logged in
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_LOCAL_HOST}`,
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else setLoggedIn(true);
        toast.success(`Hi ${data.user} 🦄`, {
          theme: "dark",
          toastId: "success1",
        });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  //gets your current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // runs api call everytime map scales or changes
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(bounds?.ne, bounds?.sw).then((data) => {
        setPlaces(data?.filter((place) => place.num_reviews > 0));
        setFilteredPlaces([]);
        setSearch("");
        setIsLoading(false);
      });
    }
  }, [bounds]);

  // filter data from api depending on your search and rating
  useEffect(() => {
    const filteredPlaces = places.filter(
      (place) => place.rating > rating && place.name.includes(search)
    );
    setFilteredPlaces(filteredPlaces);
  }, [rating, search]);

  return (
    <div>
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map places={filteredPlaces.length ? filteredPlaces : places} />
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};
export default Home;
