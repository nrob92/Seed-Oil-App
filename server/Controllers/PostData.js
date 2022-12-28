const SeedOilData = require("../Models/PostSeedOilData");

module.exports.postSeedOilData = async (req, res) => {
  try {
    const { select, input, rating, name, latitude, longitude, photo,imgFile,user } =
      req.body;
    const seedOilData = await SeedOilData.create({
      select,
      input,
      rating,
      name,
      latitude,
      longitude,
      photo,
      imgFile,
      user
    });

    res.status(200).json(seedOilData);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getSeedOilData = async (req, res) => {
  try {
    const data = await SeedOilData.find();
    res.json(data);

    //res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
