const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  addBooksToDB,
  getBooks,
  getDetailBook,
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

router.get("/books/:id", getDetailBook);
router.post("/books", addBooksToDB);

router.post("/payment", getSnapToken);

router.post("/transactions", transaction);
// router.get("/mycarts");
module.exports = router;
