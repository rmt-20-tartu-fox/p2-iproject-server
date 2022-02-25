const axios = require("axios").default;
const { Weather } = require("../models");
const WEATHER_API = process.env.WEATHER_API;

class WeatherAPI {
  static async getWeather(req, res, next) {
    try {
      const { longitude, latitude } = req.body;

      let options = {
        method: "GET",
        url: "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly",
        params: {
          lat: latitude,
          lon: longitude,
          lang: "en",
          hours: "120",
          units: "metric",
        },
        headers: {
          "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
          "x-rapidapi-key": WEATHER_API,
        },
      };

      let { data } = await axios.request(options);
      data = data.data.filter((el, i) => i % 12 == 0);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async fetchWeather(req, res, next) {
    try {
      const weather = await Weather.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = WeatherAPI;
