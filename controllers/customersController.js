const { User, Transaction, Book } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const librivox = require("../apis/librivox");
const serpapi = require("../apis/serpapi");
const { default: axios } = require("axios");

const registerCustomer = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.create({ email, password });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    next(error);
  }
};

const loginCustomer = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("NOT_FOUND");
    }
    let isValid = comparePassword(password, user.password);
    if (!isValid) {
      throw new Error("NOT_FOUND");
    }
    let token = signToken({ id: user.id, email: user.email });
    res.status(200).json({ access_token: token });
  } catch (error) {
    next(error);
  }
};

const addBooksToDB = async (req, res, next) => {
  try {
    let resp = await librivox.get(`/?limit=10&offset=20&format=json`);
    // let image = await axios.get(
    //   `https://serpapi.com/search.json?q=${resp.data.books[0].title}&tbm=isch&ijn=0&api_key=${process.env.API_KEY_SERPAPI}`
    // );
    // resp.data.books.forEach((e) => {
    //   e.imageUrl = image.data.images_results[0].original;
    // });
    let books = await Book.findAll();
    let sameBook = [];
    resp.data.books.forEach((e) => {
      books.forEach((el) => {
        if (e.title == el.title) {
          sameBook.push(e.push);
        }
      });
    });
    console.log(sameBook.length);
    if (sameBook.length == 0) {
      resp.data.books.forEach((e, i) => {
        serpapi
          .get(
            `/search.json?q=${resp.data.books[i].title}&tbm=isch&ijn=0&api_key=${process.env.API_KEY_SERPAPI}`
          )
          .then((resp) => {
            Book.create({
              title: e.title,
              price: 100000,
              link: e.url_zip_file,
              language: e.language,
              totalTime: e.totaltime,
              imageUrl: resp.data.images_results[0].original,
            });
          })
          .catch((error) => {
            next(error);
          });
      });
    }

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  try {
    let { page } = req.query;

    let books = await Book.findAndCountAll({
      limit: 10,
      offset: (page - 1) * 10,
    });
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  addBooksToDB,
  getBooks,
};
