import React, { createContext, useState } from "react";


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
