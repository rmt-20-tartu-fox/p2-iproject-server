const axios = require("axios");
// const { parse, stringify } = require("flatted");

class MemeController {
  static getMemesAPI = async (req, res, next) => {
    try {
      await axios
        .get("http://api-1cak.herokuapp.com/random", {})
        .then((resp) => {
          console.log(resp);
          res.status(200).json(resp.data);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static postMemes = async (req, res, next) => {
    try {
    } catch (err) {}
  };
}

module.exports = {
  MemeController,
};
