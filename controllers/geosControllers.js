const axios = require("axios");
const { Geo } = require("../models/index");
const geoApi_key = process.env.GEOLOCATION_API_KEY;

class Controller {
  static async createGeo(id, next) {
    try {
      const result = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${geoApi_key}`);
      await Geo.create({
        latitude: result.data.latitude,
        longitude: result.data.longitude,
        UserId: id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateGeo(id, next) {
    try {
      const result = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${geoApi_key}`);
      await Geo.update(
        {
          latitude: result.data.latitude,
          longitude: result.data.longitude,
        },
        {
          where: {
            UserId: id,
          },
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
