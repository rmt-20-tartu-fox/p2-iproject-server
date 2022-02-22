const express = require("express");
const { MemeController } = require("../controllers/memes");

const router = express.Router();

router.get("/api", MemeController.getMemesAPI);
router.get("/db", MemeController.getMemes);
router.get("/mine", MemeController.getMyMemes);
router.post("/", MemeController.postMemes);

module.exports = router;
