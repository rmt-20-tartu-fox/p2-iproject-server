require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const axios = require("axios");
const CryptoJS = require("./hmac-md5");
const enc = require("./enc-base64-min");
const language = "en-gb";
const mapboxAccessToken = process.env.MAPBOXTOKEN;
const geopifyAPI = process.env.GEOPIFYAPI;
let apiMedicSecretKey = "Rs35Lba2M8Kkw4Z7W";
enc();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//? Variabel for longitude and latitude
let longitude;
let latitude;

//? Token for API Medic
let token;

//* Get token
app.post("/loginToken", (req, res, next) => {
  //! Sandbox, dummy data
  var uri = "https://sandbox-authservice.priaid.ch/login";
  var secret_key = apiMedicSecretKey;

  //? Real data
  // var uri = "https://authservice.priaid.ch/login";
  // var secret_key = process.env.API_MEDIC_SECRET_KEY;

  var computedHash = CryptoJS.HmacMD5(uri, secret_key);
  var computedHashString = computedHash.toString(CryptoJS.enc.Base64);

  //! Dummy data
  const config = {
    headers: {
      Authorization: `Bearer jubelsinaga13@gmail.com:${computedHashString}`,
    },
  };

  //? Real data
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${process.env.API_MEDIC_USER}:${computedHashString}`,
  //   },
  // };

  axios
    .post(uri, {}, config)
    .then((resp) => {
      token = resp.data.Token;
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//* Get all symptoms
app.post("/symptoms", (req, res, next) => {
  // const { token } = req.body;

  //!Dummy url
  let url = `https://sandbox-healthservice.priaid.ch/symptoms?token=${token}&language=${language}`;

  //? Real url
  // let url = `	https://healthservice.priaid.ch/symptoms?token=${token}&language=${language}`;

  axios
    .get(url)
    .then((resp) => {
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//* Get symptoms from json
app.get("/symptoms", (req, res, next) => {
  //* Real data
  // let data = require("./data/symptoms.json");

  //! Dummy data
  let data = require("./data/dummySymptoms.json");

  res.status(200).json(data);
});

app.listen(port, () => {
  console.log("Server runs on port", port);
});
