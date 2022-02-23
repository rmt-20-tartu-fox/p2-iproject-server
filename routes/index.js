const UserController = require('../controllers/user');
const authentication = require('../middlewares/authentication');
const ownerAuthorization = require('../middlewares/owner-authorization');

const indexRouter = require('express').Router();

indexRouter.post("/login", UserController.login)
indexRouter.post("/register", UserController.register)
indexRouter.post("/login-google", UserController.loginGoogle)

indexRouter.get("/restaurants")
indexRouter.get("/restaurants/:id")

indexRouter.post("/reviews/:restaurantId")
indexRouter.get("/reviews/:restaurantId")

indexRouter.use(authentication)

indexRouter.post("/restaurants", ownerAuthorization)
indexRouter.put("/restaurants", ownerAuthorization)

indexRouter.delete("/reviews/:id")

indexRouter.post("/images/profile/:id")
indexRouter.post("/images/review/:id")
indexRouter.post("/images/restaurant/:id")

module.exports = indexRouter
