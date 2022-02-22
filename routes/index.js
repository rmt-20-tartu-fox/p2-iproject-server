const express = require("express");

const router = express.Router();

router.use("/");
// auth
router.use("/users");

module.exports = router;
