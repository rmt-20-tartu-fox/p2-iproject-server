const axios = require("axios")

const instance = axios.create({
  baseURL: 'http://openlibrary.org'
});

module.exports = instance