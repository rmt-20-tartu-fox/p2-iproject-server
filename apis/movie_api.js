const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
});

module.exports = instance;
