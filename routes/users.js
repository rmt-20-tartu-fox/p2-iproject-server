const express = require("express");
const userController = require("../controllers/usersControllers");
const profileController = require("../controllers/profilesControllers");
const likeController = require("../controllers/likesControllers");
const matchController = require("../controllers/matchesControllers");
const authorization = require("../middleware/authz");
const upload = require("../middleware/upload");

const router = express.Router();
// get all users
router.get("/", userController.getAllUsers);

// get only one user
// router.get("/:id");

// authorization

// user profiles
router.post("/:id/profiles", authorization, upload.single("profilePhoto"), profileController.createProfiles);
router.get("/:id/profiles", profileController.readProfiles);
router.put("/:id/profiles", authorization, profileController.updateProfiles);

// user likes
router.post("/:id/likes", likeController.createLikes);

// user match
router.get("/matches", matchController.viewMatches);

// user conversation
// router.post("/matches/:id/conversations");
// router.get("/matches/:id/conversations");

module.exports = router;
