const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken");
const fs = require("fs");

const { SECRET = "qwertyuiop" } = process.env;

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Faking the users list coming from a database ...
    let usersList = fs.readFileSync("./db/users.txt", { encoding: "utf-8" });
    if (usersList) {
      usersList = JSON.parse(usersList);
    } else {
      res.status(404).json({ error: "User not found" });
    }

    const foundUser = usersList.find((user) => user.username === username);
    if (foundUser) {
      //check if password matches
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        // sign token and send it in response
        const token = jwt.sign({ username: username }, SECRET);
        res.json({ success: true, data: { token: token } });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};

const signup = async (req, res) => {
  let { password } = req.body;
  try {
    // hash the password
    passwordHash = await bcrypt.hash(password, 10);
    // create a new user
    const user = {
      ...req.body,
      password: passwordHash,
    };

    let usersList = fs.readFileSync("./db/users.txt", { encoding: "utf-8" });
    if (usersList) {
      usersList = JSON.parse(usersList);
      usersList.push(user);
    } else {
      usersList = [user];
    }

    fs.writeFileSync("./db/users.txt", JSON.stringify(usersList));

    // send new user as response
    res.json({ success: true, username: req.body.username });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  login: login,
  signup: signup,
};
