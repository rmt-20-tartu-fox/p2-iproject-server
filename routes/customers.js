const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  getBooks,
} = require("../controllers/customersController");
const { getSnapToken } = require("../controllers/midtransController");
const authentication = require("../middlewares/authn");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

router.get("/books", getBooks);
// router.use(authentication);

router.post("/books", getSnapToken);
// router.get("/mycarts");
module.exports = router;
