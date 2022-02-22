const express = require("express");
const { JokeController } = require("../controllers/jokes");
const router = express.Router();

router.get("/", JokeController.getJokes);

module.exports = router;
