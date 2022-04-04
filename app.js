require("dotenv").config(); // load .env variables
const express = require("express"); // import express
const morgan = require("morgan"); //import morgan
const { log } = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors"); // import cors

const { PORT = 3000 } = process.env;
const app = express();

// Middleware
app.use(cors()); // add cors headers
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json()); // parse json bodies

// Routes
app.get("/", (req, res) => {
  res.send("this is the test route to make sure server is working");
});

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`));
