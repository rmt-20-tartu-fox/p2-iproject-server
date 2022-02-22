const { User } = require("../models");
const axios = require("axios");

class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;

    const imgUrl = await axios.get("https://picsum.photos/400")

    console.log(imgUrl)
  }
}

module.exports = UserController;
