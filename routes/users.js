const express = require("express");
const router = express.Router();

// get all users
router.get("/");

// get only one user
router.get("/:id");

// authorization

// user profiles
router.post("/profiles");
// router.get("/profiles");
// router.put("/profiles");

// user preferences
router.post("/preferences");
// router.get("/preferences");
// router.put("/preferences");

// user geos
router.post("/geos");
// router.get("/geos");
// router.put("/geos");

// user likes
router.post("/likes");

// user likes
router.post("/matches");

// user likes
router.post("/matches/:id/conversations");

module.exports = router;
