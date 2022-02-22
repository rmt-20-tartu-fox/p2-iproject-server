const express = require("express");
const userController = require("../controllers/usersControllers");
const authorization = require("../middleware/authz");
const router = express.Router();

// get all users
router.get("/", userController.getAllUsers);

// get only one user
// router.get("/:id");

// authorization

// user profiles
router.post("/:id/profiles", authorization);
router.get("/:id/profiles");
router.put("/:id/profiles", authorization);

// user likes
router.post("/likes");

// user likes
router.post("/matches");

// user likes
router.post("/matches/:id/conversations");

module.exports = router;
