const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postRestaurantData = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  photos: {
    type: Array,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  placeId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  open: {
    type: String,
    required: true,
  },
  hours: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("RestaurantData", postRestaurantData);
