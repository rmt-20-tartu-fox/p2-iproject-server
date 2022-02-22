const movie_api = require("../apis/movie_api");
// const { format } = require("util");
const { Transaction, Price } = require("../models");

const API_KEY = process.env.API_KEY;

const getPopularMovie = async (req, res, next) => {
  try {
    // const response = await axios.get(format(urlPopularMovie));
    const response = await movie_api.get(
      `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getMovieDetail = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const response = await movie_api.get(
      `/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    res.status(200).json(response.data);
  } catch (err) {
    next(err);
  }
};

const addTransaction = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { PriceId } = req.body;
    const id = req.userOnLogin.id;
    // console.log(id, movieId, PriceId, "hereeeeeeeeee");

    const movie = await Transaction.create(
      { UserId: id, MovieId: movieId, PriceId: PriceId },
      {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }
    );

    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

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

module.exports = {
  getPopularMovie,
  getMovieDetail,
  addTransaction,
};
