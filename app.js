require("dotenv").config();
const express = require("express");
const { createServer } = require("http"); // socket io
const { Server } = require("socket.io");
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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.SECRET;
const { User } = require("./models");

const httpServer = createServer(app); //* Socket
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//? Variabel for longitude and latitude
let longitude;
let latitude;

//? Token for API Medic
let token;

//? variabel untuk socket.io
let chats = [];

//* Socket
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("sendMessageToServer", (newMsg) => {
    chats = [...chats, newMsg];
    socket.broadcast.emit("sendToClient", newMsg);
  });
});

//* Register user
app.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.create({ email, password });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

//* Login
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email or password must be inputted" });
    } else {
      let foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        let isPass = bcrypt.compareSync(password, foundUser.password);
        if (isPass) {
          let payload = {
            id: foundUser.id,
            email: foundUser.email,
          };

          let token = jwt.sign(payload, secret);
          res.status(200).json({ access_token: token });
        } else {
          res.status(401).json({ message: "Invalid email/password" });
        }
      }
    }
  } catch (err) {
    if (err.errors) {
      res.status(400).json({ message: err.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

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

//* get diagnosis
app.post("/diagnosis", (req, res, next) => {
  //* get token
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
      //* Get diagnose
      const { symptoms, gender, yearOfBirth } = req.body;

      let url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${symptoms}]&gender=${gender}&year_of_birth=${yearOfBirth}&token=${token}&language=${language}`;

      return axios.get(url);
    })
    .then((resp) => {
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err.response.data);
    });

  //* Get diagnose
  // const { symptoms, gender, yearOfBirth } = req.body;

  // let url = `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=${symptoms}&gender=${gender}&year_of_birth=${yearOfBirth}&token=${token}&language=${language}`;
  // axios
  //   .get(url)
  //   .then((resp) => {
  //     res.status(200).json(resp.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send(err);
  //   });
});

//* get longitude and latitude
app.post("/coordinate", (req, res, next) => {
  const { location } = req.body;
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxAccessToken}&limit=1`;

  axios
    .get(url)
    .then((resp) => {
      longitude = resp.data.features[0].center[0];
      latitude = resp.data.features[0].center[1];
      console.log(longitude, latitude);
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
});

//* Get nearby hospital
app.post("/nearby", (req, res, next) => {
  const { location, radius } = req.body;
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxAccessToken}&limit=1`;
  axios
    .get(url)
    .then((resp) => {
      longitude = resp.data.features[0].center[0];
      latitude = resp.data.features[0].center[1];
      let categories = "healthcare.hospital";
      let limit = 20;
      let url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${longitude},${latitude},${radius}&limit=${limit}&apiKey=${geopifyAPI}`;
      return axios.get(url);
    })
    .then((resp) => {
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });

  //! old code
  // let categories = "healthcare.hospital";
  // let limit = 20;
  // let url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${longitude},${latitude},${radius}&limit=${limit}&apiKey=${geopifyAPI}`;
  // axios
  //   .get(url)
  //   .then((resp) => {
  //     console.log(resp.data);
  //     res.status(200).json(resp.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send(err);
  //   });
});

// app.listen(port, () => {
//   console.log("Server runs on port", port);
// });

httpServer.listen(port, () => {
  console.log("server runs on port", port);
});
