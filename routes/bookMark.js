const express = require("express");
const router = express.Router();
const authorization = require('../middleware/authorization')

const BookMarkController = require("../controller/bookMarkController")

router.post('/bookmarks', BookMarkController.addBookMark)
router.get('/bookmarks', BookMarkController.getBookMark)
router.delete('/bookmarks/:id', authorization, BookMarkController.cancelBookMark)

module.exports = router;
