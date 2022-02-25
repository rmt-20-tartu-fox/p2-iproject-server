const express = require("express");
const router = express.Router();

const CityController = require('../controller/cityController.js')

router.get('/cities', CityController.fetchCity)
router.get('/cities/all', CityController.fetchAllCity)

module.exports = router;

