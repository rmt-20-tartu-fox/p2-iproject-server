const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  addBooksToDB,
  getBooks,
} = require("../controllers/customersController");
const {
  getSnapToken,
  transaction,
} = require("../controllers/midtransController");
const authentication = require("../middlewares/authn");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

router.get("/books", getBooks);
router.use(authentication);
router.post("/books", addBooksToDB);

router.post("/transactions", getSnapToken);
router.patch("/transactions", transaction);
// router.get("/mycarts");
module.exports = router;
