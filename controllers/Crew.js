const fs = require("fs");

const getList = (req, res) => {
  try {
    let crew = fs.readFileSync("./db/crew.txt", { encoding: "utf-8" });
    if (crew) {
      crew = JSON.parse(crew);
      res.json({ success: true, crew: crew });
    } else {
      res.status(404).json({ error: "Crew not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Impossible to fetch crew" });
  }
};

module.exports = {
  getList: getList,
};
