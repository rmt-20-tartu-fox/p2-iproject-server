const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
} = require("../controllers/customersController");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/mycarts");
module.exports = router;
