const express = require("express");
const { authentification } = require("../middleware/authn");
const authRouter = require("./auth");
const usersRouter = require("./users");
const router = express.Router();

router.use("/", authRouter);

// authn
router.use(authentification);

router.use("/users", usersRouter);

module.exports = router;
