const express = require("express");
const userController = require("../controllers/usersControllers");
const router = express.Router();

// get all users
router.get("/", userController.getAllUsers);

// get only one user
router.get("/:id");

// authorization

// user geos
router.post("/geos");
// router.get("/geos");
// router.put("/geos");

// user profiles
router.post("/profiles");
// router.get("/profiles");
// router.put("/profiles");

// user likes
router.post("/likes");

// user likes
router.post("/matches");

// user likes
router.post("/matches/:id/conversations");

module.exports = router;
