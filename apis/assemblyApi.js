const axios = require("axios");
  
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "ebc33f0e839a4f8b85665a76695acf33",
        "content-type": "application/json",
    },
});

module.exports = assembly