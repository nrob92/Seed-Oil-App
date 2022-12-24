import React, { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import "../Map/mapStyles.css";
import mapStyles from "./mapStyles";
import AppContext from "../../Contexts/AppContext";
import { useContext } from "react";
import axios from "axios";
import PlacesMap from "../PlacesMap/PlacesMap";
import SeedOilMap from "../SeedOilMap/SeedOilMap";

const Map = ({ places }) => {
  const {
    setCoords,
    coords,
    setBounds,
    setChildClicked,
    setSeedOilData,
    seedOilData,
  } = useContext(AppContext);

  useEffect(() => {
    const getSeedOilData = async () => {
      let response = await axios.get(`${process.env.REACT_APP_LOCAL_HOST}get`);
      setSeedOilData(response.data);
    };
    getSeedOilData();
  }, []);

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
        padding: "25px",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={coords}
        defaultZoom={14}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {places?.map((place, i) => {
          return (
            <div
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              <PlacesMap place={place} />
            </div>
          );
        })}

        {seedOilData?.map((place, i) => {
          return (
            <div
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              <SeedOilMap place={place} />
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
