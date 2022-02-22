const express = require("express");
const multer = require("multer");
const { MemeController } = require("../controllers/memes");
const { fileStorage, fileFilter } = require("../helpers/multer");
const router = express.Router();

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

router.get("/", MemeController.getMemesAPI);
router.post("/");

module.exports = router;
