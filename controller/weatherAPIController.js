const axios = require("axios").default;

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
          "x-rapidapi-key":
            "b2d6979e45msh4535f2eb6faae6ep1bd4acjsneebd13a671c8",
        },
      };

      let { data } = await axios.request(options);
      data = data.data.filter((el, i) => i % 12 == 0);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = WeatherAPI;
