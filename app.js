if (process.env.NODE_ENV !== "production"){
  require('dotenv').config(); 
}
 

const express = require("express");
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 3000
const { UserController, BooksController, BookmarkController } = require("./controllers")
const errorHandler = require("./middlewares/errorHandler")
const authentication = require("./middlewares/authn")


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", UserController.postRegister)
app.post("/login", UserController.postLogin)
app.post("/login-google", UserController.loginGoogle)
app.post("/login-fb", UserController.loginFb)
app.get("/books", BooksController.getBookBySubject)
app.get("/books/search", BooksController.getBookByTitle)
app.use(authentication)
app.post("/bookmarks", BookmarkController.postBookmark)
app.get("/bookmarks", BookmarkController.getBookmark)
app.delete("/bookmarks/:bookmarkId", BookmarkController.deleteBookmark)
app.use(errorHandler)

app.listen(PORT, _=>{
  console.log(`running in port ${PORT}`);
})