const express = require("express");
const router = express.Router();

const BookingAPI = require('../controller/bookingComController.js')

router.post('/bookings', BookingAPI.getHotel)
router.post('/bookings/hotels', BookingAPI.roomDetailHotel)
router.post('/bookings/search', BookingAPI.searchLocation)

module.exports = router;
