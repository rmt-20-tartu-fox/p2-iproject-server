const { User } = require("../models");
const axios = require("axios");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;

      const response = await axios.get("https://picsum.photos/400");

      // console.log(imgUrl.request._redirectable._options.href)
      // console.log(imgUrl.data)

      const result = await User.create({
        username,
        email,
        password,
        imgUrl: response.request._redirectable._options.href,
        role,
      });

      res.status(200).json({
        id: result.id,
        username: result.username,
        email: result.email,
        role: result.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
