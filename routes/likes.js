const express = require("express");
const { LikeController } = require("../controllers/likes");
const router = express.Router();

router.get("/", LikeController.getLikes);
router.post("/:memeId", LikeController.postLike);
router.delete("/:id", LikeController.deleteLike);

module.exports = router;
