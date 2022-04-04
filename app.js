// load .env variables
require("dotenv").config();
const express = require("express");
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

// Routes
app.use("/user", userRoute);
app.use("/crew", crewRoute);
app.use("/status", statusRoute);

app.get("/", (_req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`));
