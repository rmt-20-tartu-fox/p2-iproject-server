const RestaurantController = require("../controllers/restaurant");
const ReviewController = require("../controllers/review");
const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");
const ownerAuthorization = require("../middlewares/owner-authorization");
const restaurantAuthorization = require("../middlewares/restaurant-authorization");
const uploadMultiple = require("../middlewares/upload-multiple");
const uploadSingle = require("../middlewares/upload-single");
const indexRouter = require("express").Router();

indexRouter.post("/login", UserController.login);
indexRouter.post("/register", UserController.register);
indexRouter.post("/login-google", UserController.loginGoogle);

indexRouter.get("/restaurants", RestaurantController.getAll);
indexRouter.get("/restaurants/:id", RestaurantController.getOne);

indexRouter.get("/reviews/:restaurantId", ReviewController.getAll);

indexRouter.use(authentication);

indexRouter.post("/restaurants", ownerAuthorization, uploadSingle, RestaurantController.add);
indexRouter.put(
  "/restaurants/:id",
  ownerAuthorization,
  restaurantAuthorization
);

indexRouter.put("/profile/:id", uploadSingle);

indexRouter.post("/images/review/:id");

indexRouter.post("/reviews/:restaurantId", uploadMultiple, ReviewController.create);
indexRouter.delete("/reviews/:id", ReviewController.delete);

module.exports = indexRouter;
