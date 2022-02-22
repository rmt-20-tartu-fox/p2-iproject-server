if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
// const axios = require("axios");
const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3000;
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);
app.use(errorHandler);

// app.get("/", (req, res, next) => {
//   res.status(200).json({ message: "server runing" });
// });

// app.get("/movies-latest", async (req, res, next) => {
//   try {
//     const response = await axios.get(
//       "https://api.themoviedb.org/3/movie/latest?api_key=38f2cc376208d37fec1e1dbaa6c3ae29&language=en-US"
//     );

//     res.status(200).json(response.data);
//   } catch (err) {
//     console.log("🚀 ~ file: app.js ~ line 22 ~ app.get ~ err", err);
//     res.status(500).json({ message: "see your console" });
//   }
// });

// app.get("/genre-list", async (req, res, next) => {
//   try {
//     const response = await axios.get(moviegenres);

//     res.status(200).json(response.data);
//   } catch (err) {
//     console.log("🚀 ~ file: app.js ~ line 22 ~ app.get ~ err", err);
//     res.status(500).json({ message: "see your console" });
//   }
// });

app.listen(PORT, () => {
  console.log("Listening now at", PORT);
});
