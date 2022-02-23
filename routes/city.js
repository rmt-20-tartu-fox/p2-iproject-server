const express = require("express");
const router = express.Router();

const CityController = require('../controller/cityController.js')

router.get('/cities', CityController.fetchCity)

module.exports = router;
