const { Joke } = require("../models");
const axios = require("axios");

class JokeController {
  static getJokes = async (req, res, next) => {
    try {
      await axios
        .get(
          "https://us-central1-dadsofunny.cloudfunctions.net/DadJokes//random/jokes/10"
        )
        .then((resp) => {
          res.status(200).json(resp.data);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  JokeController,
};
