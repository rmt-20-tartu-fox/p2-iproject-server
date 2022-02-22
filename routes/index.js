const express = require("express");
const router = express.Router();

// router import
const categoriesRouter = require("./categories");
const jokesRouter = require("./jokes");
const memesRouter = require("./memes");
const likesRouter = require("./likes");
const { authentication } = require("../middlewares/authn");
const { Controller } = require("../controllers");

router.get("/", (req, res) => {
  res.send("masuk");
});

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.use("/categories", categoriesRouter);
router.use("/jokes", jokesRouter);
router.use("/memes", memesRouter);
router.use("/likes", likesRouter);

module.exports = router;
