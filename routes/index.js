const express = require("express");
const router = express.Router();

const bookingRouter = require("./bookingAPI")
const weatherRouter = require("./weatherAPI")

const loginMiddleware = require("../middleware/authentication");

router.post("/register");
router.post("/login");
router.post("/googlelogin")
router.use('/', bookingRouter)
router.use('/', weatherRouter)

module.exports = router;
