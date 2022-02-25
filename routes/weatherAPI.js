const express = require("express");
const router = express.Router();

const WeatherAPI = require('../controller/weatherAPIController.js')

router.post('/weathers', WeatherAPI.getWeather)

module.exports = router;
