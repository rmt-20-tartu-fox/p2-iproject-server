const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const axios = require("axios");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/icon", (req, res) => {
  const email = req.query.email;
  axios
    .get(
      `https://api.giphy.com/v1/stickers/translate?api_key=CmqkYV37raohUwG08NVagcoWMsARk9ks&s=${email}`
    )
    .then(({ data }) => {
      res.status(200).json(data);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
