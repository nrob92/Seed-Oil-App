import React, { useState, useEffect, createRef, useContext } from "react";
import Box from "@mui/material/Box";
import "../List/listStyle.css";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import AppContext from "../../Contexts/AppContext";

const List = ({ places }) => {
  const [elRefs, setElRefs] = useState([]);
  const { childClicked, isLoading, rating, setRating, setSearch, search } =
    useContext(AppContext);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <Box>
      <Typography mb={2} variant="h4">
        Restaraunts
      </Typography>
      {isLoading ? (
        <div className="loading">
          <CircularProgress size={"5rem"} />
        </div>
      ) : (
        <>
          <FormControl className="form">
            <InputLabel>Rating</InputLabel>
            <Select
              label="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value={0}>all</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
            <input
              type="text"
              value={search}
              placeholder="search name"
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
          <Grid container spacing={3} className="list">
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;
