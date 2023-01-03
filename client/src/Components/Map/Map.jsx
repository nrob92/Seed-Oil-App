import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "../Map/mapStyles.css";
import mapStyles from "./mapStyles";
import AppContext from "../../Contexts/AppContext";
import { useContext } from "react";
import axios from "axios";
import PlacesMap from "../PlacesMap/PlacesMap";

const Map = ({ places }) => {
  const { setCoords, coords, setChildClicked, seedOilData, setRestaurantData } =
    useContext(AppContext);

  useEffect(() => {
    const getRestaurantData = async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_LOCAL_HOST}getRestaurantData`
      );
      setRestaurantData(response.data);
    };
    getRestaurantData();
  }, [seedOilData]);

  //gets your current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  return (
    <div
      style={{
        height: "90vh",
        padding: "26px",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={coords}
        defaultZoom={12}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places?.map((place, i) => {
          return (
            <div lat={Number(place.lat)} lng={Number(place.lng)} key={i}>
              <PlacesMap place={place} />
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
