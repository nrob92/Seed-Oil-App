import React, { createContext, useState,useEffect } from "react";
import { getPlacesData } from "../api";


export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [search, setSearch] = useState("");
  const [seedOilData, setSeedOilData] = useState([]);

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




  const value = {
    loggedIn,
    setLoggedIn,
    coords,
    setCoords,
    filteredPlaces,
    setFilteredPlaces,
    places,
    setPlaces,
    bounds,
    setBounds,
    childClicked,
    setChildClicked,
    isLoading,
    setIsLoading,
    rating,
    setRating,
    search,
    setSearch,
    setSeedOilData,
    seedOilData
    
  };

 
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
