const { User, Transaction, Book } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const librivox = require("../apis/librivox");
const serpapi = require("../apis/serpapi");
const { default: axios } = require("axios");
const { sequelize } = require("../models");

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
    let { offset } = req.body;
    let resp = await librivox.get(
      `/?limit=10&offset=${offset * 10}&format=json`
    );
    let books = await Book.findAll();
    let sameBook = [];
    resp.data.books.forEach((e) => {
      books.forEach((el) => {
        if (e.title == el.title) {
          sameBook.push(e.push);
        }
      });
    });
    if (sameBook.length == 0) {
      resp.data.books.forEach((e, i) => {
        serpapi
          .get(
            `/search.json?q=${resp.data.books[i].title}BookCover&tbm=isch&ijn=0&api_key=${process.env.API_KEY_SERPAPI2}`
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

    res.status(200).json({ message: `Books has been added` });
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

const getDetailBook = async (req, res, next) => {
  try {
    let { id } = req.params;
    let book = await Book.findByPk(+id);
    if (!book) {
      throw new Error("BOOK_NOT_FOUND");
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    let transactions = await Transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Book,
        },
      ],
      where: {
        status: "Completed",
        UserId: req.userLogin.id,
      },
    });

    const unique = [
      ...new Map(transactions.map((item) => [item["BookId"], item])).values(),
    ];

    res.status(200).json(unique);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  addBooksToDB,
  getBooks,
  getDetailBook,
  getTransaction,
};
