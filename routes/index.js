const RestaurantController = require("../controllers/restaurant");
const ReviewController = require("../controllers/review");
const UserController = require("../controllers/user");
const WishlistController = require("../controllers/wishlist");

const authentication = require("../middlewares/authentication");
const customerAuthorization = require("../middlewares/customer-authorization");
const ownerAuthorization = require("../middlewares/owner-authorization");
const restaurantAuthorization = require("../middlewares/restaurant-authorization");
const reviewAuthorization = require("../middlewares/review-authorization");

const uploadMultiple = require("../middlewares/upload-multiple");
const uploadSingle = require("../middlewares/upload-single");
const wishlistAuthorization = require("../middlewares/wishlist-authorization");
const indexRouter = require("express").Router();

indexRouter.post("/login", UserController.login);
indexRouter.post("/register", UserController.register);
indexRouter.post("/login-google", UserController.loginGoogle);

indexRouter.get("/restaurants", RestaurantController.getAll);
indexRouter.get("/restaurants/:id", RestaurantController.getOne);

indexRouter.get("/reviews/:restaurantId", ReviewController.getAll);

indexRouter.use(authentication);

indexRouter.post(
  "/restaurants",
  ownerAuthorization,
  uploadSingle,
  RestaurantController.add
);
indexRouter.put(
  "/restaurants/:id",
  ownerAuthorization,
  restaurantAuthorization
);

indexRouter.get("/profiles/:id", UserController.getOne)
indexRouter.put("/profiles/:id", uploadSingle, UserController.edit);


indexRouter.post(
  "/reviews/:restaurantId",
  uploadMultiple,
  customerAuthorization,
  ReviewController.create
);
indexRouter.delete(
  "/reviews/:id",
  reviewAuthorization,
  ReviewController.delete
);

indexRouter.use(customerAuthorization)

indexRouter.get("/wishlists", WishlistController.getAll)
indexRouter.post("/wishlists/:restaurantId", WishlistController.add)
indexRouter.delete("/wishlists/:id", wishlistAuthorization, WishlistController.delete)

module.exports = indexRouter;
