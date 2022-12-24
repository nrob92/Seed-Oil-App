const { register, login } = require("../Controllers/AuthControllers");
const { postSeedOilData,getSeedOilData} = require ("../Controllers/PostData")
const { checkUser } = require("../Middlewares/AuthMiddlewares");

const router = require("express").Router();

router.post("/", checkUser);
router.post("/register", register);
router.post("/login", login);
router.post("/post", postSeedOilData);
router.get("/get", getSeedOilData);


module.exports = router;
