import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Map from "../Components/Map/Map";
import { Grid } from "@mui/material";
import List from "../Components/List/List";
import { getPlacesData } from "../api";
import { useContext } from "react";
import LoginContext from "../Contexts/LoginContext";
import NavBar from "../Components/NavBar";

const Home = () => {
  const { setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState("");

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(bounds?.ne, bounds?.sw).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [ bounds]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  return (
    <div>
      <NavBar setCoords={setCoords} />
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};
export default Home;
