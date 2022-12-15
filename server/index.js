const express = require("express");
const UserModel = require("./models/Users");
const app = express();
const mongoose = require("mongoose");
app.use(express.json())

mongoose.connect(
  "mongodb+srv://nrob92:Nrob1992@seed-oil-app.3msosdv.mongodb.net/Seed-Oil-App?retryWrites=true&w=majority"
);

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});


app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user)
});

app.listen(3001, () => {
  console.log("SERVER RUNNING");
});
