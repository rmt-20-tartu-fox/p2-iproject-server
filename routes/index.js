const RestaurantController = require("../controllers/restaurant");
const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");
const ownerAuthorization = require("../middlewares/owner-authorization");
const restaurantAuthorization = require("../middlewares/restaurant-authorization");

const uploadSingle = require("../middlewares/upload-single");

const indexRouter = require("express").Router();

indexRouter.post("/login", UserController.login);
indexRouter.post("/register", UserController.register);
indexRouter.post("/login-google", UserController.loginGoogle);

indexRouter.get("/restaurants", RestaurantController.getAll);
indexRouter.get("/restaurants/:id", RestaurantController.getOne);

indexRouter.get("/reviews/:restaurantId");

indexRouter.use(authentication);

indexRouter.post("/restaurants", ownerAuthorization, uploadSingle, RestaurantController.add);
indexRouter.put(
  "/restaurants/:id",
  ownerAuthorization,
  restaurantAuthorization
);

indexRouter.post("/images/profile/:id");
indexRouter.post("/images/review/:id");
indexRouter.post("/images/restaurant/:id");

indexRouter.delete("/reviews/:id");
indexRouter.post("/reviews/:restaurantId");

module.exports = indexRouter;
