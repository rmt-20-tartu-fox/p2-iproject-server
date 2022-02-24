const express = require("express");
const { CategoryController } = require("../controllers/categories");
const router = express.Router();

router.get("/", CategoryController.getCategories);

module.exports = router;
