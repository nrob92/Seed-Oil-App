const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSeedOilData = new Schema({
  select: {
    type: String,
  },
  input: {
    type: String,
  },
  rating: {
    type: Number,
  },
  name: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  photo: {
    type: String,
  },
});

module.exports = mongoose.model("SeedOilData", postSeedOilData);
