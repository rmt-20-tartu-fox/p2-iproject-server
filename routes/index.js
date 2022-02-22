const router = require("express").Router();
const userRouter = require("./userRouter");
const movieRouter = require("./movieRouter");

router.use("/", userRouter);
router.use("/", movieRouter);
// router.use("/movies", movieRouter);

module.exports = router;
