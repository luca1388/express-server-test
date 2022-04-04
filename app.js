// load .env variables
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { log } = require("mercedlogger");
const cors = require("cors");
const userRoute = require("./routes/user").userRoute;

const { PORT = 3000 } = process.env;
const app = express();

// Middleware
app.use(cors());
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json());

// Routes
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`));
