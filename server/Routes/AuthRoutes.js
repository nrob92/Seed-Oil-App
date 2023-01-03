const { register, login } = require("../Controllers/AuthControllers");
const { getRestaurantData } = require("../Controllers/GetData");

const { getUser } = require("../Controllers/GetUsers");

const {
  postSeedOilData,
  postRestaurantData,
} = require("../Controllers/PostData");
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();

router.get("/getUser", getUser);

router.get("/getRestaurantData", getRestaurantData);

router.post("/", checkUser);

router.post("/register", register);

router.post("/login", login);

router.post("/postSeedOilData", postSeedOilData);

router.post("/postRestaurantData", postRestaurantData);

module.exports = router;
