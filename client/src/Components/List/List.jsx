import React, { useState } from "react";
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

const List = ({places}) => {
  const [rating, setRating] = useState("");
 
  return (
    <Box p={2}>
      <Typography mb={2} variant="h4">
        Restaraunts
      </Typography>
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
      </FormControl>
      <Grid container spacing={3}  className="list">
        {places?.map((place, i) => (
          <Grid item key={i} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default List;
