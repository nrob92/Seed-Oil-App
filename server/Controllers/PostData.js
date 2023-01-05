const RestaurantData = require("../Models/PostRestaurantData");

module.exports.postSeedOilData = async (req, res) => {
  try {
    const { select, input, userRating, imgFile, user, id } = req.body;

    require("mongoose").model("RestaurantData").schema.add({
      select: String,
      input: String,
      userRating: Number,
      imgFile: String,
      user: String,
    });
    const userId = await RestaurantData.findById(id);

    const seedOilData = await RestaurantData.findByIdAndUpdate(userId, {
      select: select,
      input: input,
      userRating: userRating,
      imgFile: imgFile,
      user: user,
    });

    res.status(200).json(seedOilData);
  } catch (err) {
    console.log(err);
  }
};

module.exports.postRestaurantData = async (req, res) => {
  try {
    const { lat, lng, photos, name, rating, website, address, phone, id } =
      req.body;

    const restaurantData = await RestaurantData.create({
      lat,
      lng,
      photos,
      name,
      rating,
      website,
      address,
      phone,
      id,
    });

    res.status(200).json(restaurantData);
  } catch (err) {
    console.log(err);
  }
};
