const axios = require("axios");
const midtrans = `https://app.sandbox.midtrans.com`;

const instance = axios.create({
  baseURL: midtrans,
});

module.exports = instance;
