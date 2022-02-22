const express = require("express");
const router = express.Router();

// router import
const jokesRouter = require("./jokes");
const memesRouter = require("./memes");
const likesRouter = require("./likes");

router.get("/", (req, res) => {
  res.send("masuk");
});

router.post("/register");
router.post("/login");

router.use("/jokes", jokesRouter);
router.use("/memes", memesRouter);
router.use("/likes", likesRouter);

module.exports = router;
