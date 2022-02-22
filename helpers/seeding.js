const fs = require("fs");

function readJson(dir) {
  const data = JSON.parse(fs.readFileSync(dir, "utf8"));
  data.forEach((e) => {
    e.createdAt = new Date();
    e.updatedAt = new Date();
  });
  return data;
}

module.exports = {
  readJson,
};
