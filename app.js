// load .env variables
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { log } = require("mercedlogger");
const cors = require("cors");
const { crewRoute } = require("./routes/crew");
const { userRoute } = require("./routes/user");
const { statusRoute } = require("./routes/status");

const { PORT = 3000 } = process.env;
const app = express();

// Middleware
app.use(cors());
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json());

app.use(cookieParser());

// Routes
app.get("/cookies", (req, res) => {
  res
    .cookie("cookieCheck", "abc", {
      httpOnly: true,
      secure: true,
      domain: process.env.API_URL,
    })
    .cookie("doubleCookieCheck", "xyz", {
      httpOnly: true,
      secure: true,
      domain: process.env.API_URL,
    })
    .cookie("simpleCookie", "ok", {
      domain: process.env.API_URL,
    })
    .json({ success: true });
});

app.get("/status", (req, res) => {
  const requestCookies = req.cookies;
  console.log(requestCookies);
  res.json({
    success: true,
    message: requestCookies.cookieCheck ? "Cookie sent!" : "Cookie not sent :(",
  });
});

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`));
