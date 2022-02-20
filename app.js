const express = require("express");
const app = express()
const port = 2000
const router = require('./routes')
const { User, Product, Cart } = require('./models');
const errorHandler = require("./middlewares/errorHandler");
app.use(express.urlencoded({ extended: false }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Aplikasi Berjalan');
})