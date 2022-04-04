const express = require("express");
const { isLoggedIn } = require("../middleware/checkLogged");
const statusRoute = express.Router();

statusRoute.get("/", (req, res) => {
  res.json({ success: true, message: "Ship up and running" });
});

statusRoute.get("/weapons", isLoggedIn, (req, res) => {
  res.json({ success: true, message: "Ship ready for battle" });
});

module.exports = {
  statusRoute: statusRoute,
};
