const axios = require("axios");
const librivox = `https://librivox.org/api/feed/audiobooks`;

const instance = axios.create({
  baseURL: librivox,
});

module.exports = instance;
