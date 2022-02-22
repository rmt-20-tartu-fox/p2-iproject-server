const API_KEY = "5bb0bc5b6271260f671527a214f7069d";

class WeatherController {
  static async getWeather(request, response, next) {
    navigator.geolocation.getCurrentPosition((success) => {
      const { latitude, longitude } = success.coords;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    });
  }
}

module.exports = WeatherController;
