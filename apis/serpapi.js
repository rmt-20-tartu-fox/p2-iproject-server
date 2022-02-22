const axios = require("axios");
const serpapi = `https://serpapi.com/search.json?`;

const instance = axios.create({
  baseURL: serpapi,
});

module.exports = instance;
