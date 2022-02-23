const axios = require("axios");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

class WeatherController {
  static async getWeather(request, response, next) {
    try {

      const { latitude, longitude } = request.query;

      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${SECRET_KEY}`
      );
      response.status(200).json(data.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WeatherController;
