import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Map from "../Components/Map/Map";
import { Grid } from "@mui/material";
import List from "../Components/List/List";
import { AppContext } from "../Contexts/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {
    setLoggedIn,
    filteredPlaces,
    setFilteredPlaces,
    places,
    rating,
    search,
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

  

  // filter data from api depending on your search
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
