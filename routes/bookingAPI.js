const express = require("express");
const router = express.Router();

const BookingAPI = require('../controller/bookingComController.js')

router.get('/bookings', BookingAPI.getHotel)
router.get('/bookings/hotels', BookingAPI.roomDetailHotel)
router.get('/bookings/search', BookingAPI.searchLocation)

module.exports = router;
