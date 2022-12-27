const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");
mongoose.set('strictQuery', true);
var bodyParser = require('body-parser')
require('dotenv').config();

const port = process.env.REACT_APP_MONGO_CONNECTION;

app.listen(3001, () => {
  console.log("SERVER RUNNING");
});

mongoose
  .connect(
    port,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connection successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoutes);
