const express = require("express");
const { authentification } = require("../middleware/authn");
const authRouter = require("./auth");
const usersRouter = require("./users");
const uploadsRouter = require("./uploads");
const router = express.Router();

router.use("/", authRouter);
router.use("/uploads", uploadsRouter);
// authn
router.use(authentification);

router.use("/users", usersRouter);

module.exports = router;
