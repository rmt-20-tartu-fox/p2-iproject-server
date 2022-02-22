const express = require("express");
const router = express.Router();

router.get("/");
router.post("/:memeId");
router.delete("/:id");

module.exports = router;
