const { Restaurant } = require("../models");

class RestaurantController {
  static async add(req, res, next) {
    try {
      const { name, address, lat, lng, mapsUrl } = req.body;
      const { id: UserId } = req.user;

      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = RestaurantController;
