const express = require("express");
const { LikeController } = require("../controllers/likes");
const { likeAuthz } = require("../middlewares/authz");
const router = express.Router();

router.get("/", LikeController.getLikes);
router.post("/:memeId", LikeController.postLike);
router.delete("/:id", likeAuthz, LikeController.deleteLike);

module.exports = router;
