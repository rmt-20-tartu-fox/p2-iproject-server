const router = require("express").Router();
const customer = require("./customers");

router.use("/customers", customer);

module.exports = router;
