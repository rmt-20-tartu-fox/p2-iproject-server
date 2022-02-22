const express = require("express");
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 3000
const { UserController, BooksController } = require("./controllers")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", UserController.postRegister)
app.post("/login", UserController.postLogin)
app.get("/books", BooksController.getBookBySubject)

app.listen(PORT, _=>{
  console.log(`running in port ${PORT}`);
})