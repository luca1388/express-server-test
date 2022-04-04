const express = require("express");
const { getList } = require("../controllers/Crew");
const crewRoute = express.Router();

crewRoute.get("/", getList);

module.exports = {
  crewRoute: crewRoute,
};
