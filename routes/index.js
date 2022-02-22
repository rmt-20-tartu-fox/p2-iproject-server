const express = require("express");
const router = express.Router();

const bookingRouter = require("./bookingAPI")
const weatherRouter = require("./weatherAPI")
const bookMarkRouter = require("./bookMark")

const UserController = require('../controller/userController')
const loginMiddleware = require("../middleware/authentication");

router.post("/register", UserController.registerUser);
router.post("/login", UserController.userLogin);
router.post("/googlelogin", UserController.googleLogin)
router.use('/', bookingRouter)
router.use('/', weatherRouter)
router.use('/', loginMiddleware, bookMarkRouter)

module.exports = router;
