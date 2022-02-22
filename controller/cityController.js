const { City } = require("../models");

class CityController {
  static async fetchCity(req, res, next) {
    try {
      const weather = await Weather.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
    } catch (err) {
      next(err);
    }
  }

  static async addCity(req, res, next) {
    try {
      const { name, long, lat, imgUrl, tittle, description } = req.body;

      const addCity = await City.create({
        name,
        long,
        lat,
        imgUrl,
        tittle,
        description,
      });

      const city = await City.findOne({
        where: { id: addCity.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json(city);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCity(req, res, next) {
    try {
      const { id } = req.params;

      const city = await City.findOne({
        where: { id: addCity.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      if (!city) {
        throw {
          code: 404,
          name: "NotFound",
          message: "City ID Not Found",
        }
      }

      await City.destroy({
        where: {
          id: city.id
        }
      });

      res.status(200).json({message: "City has been deleted"});
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CityController;
