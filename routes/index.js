const express = require("express");
const authRouter = require("./auth");
const usersRouter = require("./users");
const router = express.Router();

router.use("/", authRouter);

// auth

router.use("/users", usersRouter);

module.exports = router;
