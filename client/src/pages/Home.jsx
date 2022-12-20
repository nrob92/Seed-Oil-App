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

const Home = () => {
  const { setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (bounds) {
      setIsLoading(true);

      getPlacesData(bounds?.ne, bounds?.sw).then((data) => {
        setPlaces(data);
        setIsLoading(false);
      });
    }
  }, [coords, bounds]);

  return (
    <>
      <Grid container style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};
export default Home;
