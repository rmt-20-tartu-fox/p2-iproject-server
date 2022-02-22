const { User, Transaction, Book } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const librivox = require("../apis/librivox");
const serpapi = require("../apis/serpapi");

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

const getBooks = async (req, res, next) => {
  try {
    const resp = await librivox.get(`/?limit=10&offset=0&format=json`);
    let book = await Book.findAll();
    // let filter = book.filter((el) => {});
    // resp.data.forEach((e) => {
    //   await Book.create({
    //     title: e.title,
    //     price: 100000,
    //     link: e.url_zip_file,
    //     language: e.language,
    //     totalTime: e.totaltime,
    //     imageUrl: await serpapi.get(
    //       `/q=${e.title}&api_key=${process.env.API_KEY_SERPAPI}`
    //     ),
    //   });
    // });

    res.status(200).json(resp.data);
  } catch (error) {
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getTransaction,
  getBooks,
};
