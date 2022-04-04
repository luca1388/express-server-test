const express = require("express");
const { login, signup } = require("../controllers/User");
const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/signup", signup);

module.exports = {
  userRoute: userRoute,
};
