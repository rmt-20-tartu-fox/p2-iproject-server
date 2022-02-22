const axios = require("axios");
const serpapi = `https://serpapi.com`;

const instance = axios.create({
  baseURL: serpapi,
});

module.exports = instance;
