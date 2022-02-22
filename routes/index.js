const indexRouter = require('express').Router();

indexRouter.get("/login")
indexRouter.get("/register")
indexRouter.get("/login-google")

indexRouter.get("/restaurants")
indexRouter.post("/restaurants")
indexRouter.put("/restaurants")
indexRouter.get("/restaurants/:id")

indexRouter.post("/reviews/:restaurantId")
indexRouter.get("/reviews/:restaurantId")
indexRouter.delete("/reviews/:id")

indexRouter.post("/images/profile/:id")
indexRouter.post("/images/review/:id")
indexRouter.post("/images/restaurant/:id")

module.exports = indexRouter