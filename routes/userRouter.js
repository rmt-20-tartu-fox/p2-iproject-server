const router = require("express").Router();
const userController = require("../controllers/userController");
// const authentication = require("../middlewares/authentication");

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
