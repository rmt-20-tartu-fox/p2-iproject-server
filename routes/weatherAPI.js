const express = require("express");
const router = express.Router();

const WeatherAPI = require('../controller/weatherAPIController.js')

router.get('/weathers', WeatherAPI.getWeather)

module.exports = router;
