const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  addBooksToDB,
  getBooks,
  getDetailBook,
  getTransaction,
  googleLogin,
  sendEmail,
} = require("../controllers/customersController");
const {
  getSnapToken,
  transaction,
} = require("../controllers/midtransController");
const authentication = require("../middlewares/authn");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/login-google", googleLogin);
router.get("/books", getBooks);

router.use(authentication);

router.get("/books/:id", getDetailBook);
router.post("/books", addBooksToDB);

router.post("/payment", getSnapToken);

router.get("/transactions", getTransaction);
router.post("/transactions", transaction);
router.post("/send-emails", sendEmail);
// router.get("/mycarts");
module.exports = router;
