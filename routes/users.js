const express = require("express");
const userController = require("../controllers/usersControllers");
const profileController = require("../controllers/profilesControllers");
const likeControler = require("../controllers/likesControllers");
const authorization = require("../middleware/authz");
const router = express.Router();

// get all users
router.get("/", userController.getAllUsers);

// get only one user
// router.get("/:id");

// authorization

// user profiles
router.post("/:id/profiles", authorization, profileController.createProfiles);
router.get("/:id/profiles", profileController.readProfiles);
router.put("/:id/profiles", authorization, profileController.updateProfiles);

// user likes
router.post("/:id/likes", likeControler.createLikes);

// user conversation
router.post("/matches/:id/conversations");

module.exports = router;
