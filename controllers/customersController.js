const { User, Transaction, Book } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const librivox = require("../apis/librivox");
const serpapi = require("../apis/serpapi");
const { default: axios } = require("axios");
const { sequelize } = require("../models");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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
    if (!email) {
      throw new Error("NEED_EMAIL");
    }
    if (!password) {
      throw new Error("NEED_PASSOWRD");
    }
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
      res.status(201).json({ message: `Books has been added` });
    } else {
      res.status(400).json({ message: `Dupication books` });
    }
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  try {
    let { page, title } = req.query;
    let condition;
    if (title) {
      condition = {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      };
    }
    let books = await Book.findAndCountAll({
      limit: 10,
      offset: (page - 1) * 10,
      where: condition,
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
    next(error);
  }
};

const sendEmail = async (req, res, next) => {
  try {
    let { title, link } = req.body;
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: process.env.EMAIL,
      to: req.userLogin.email,
      subject: "Success for payment",
      text: `success buy ${title}. this is the link ${link}`,
    };
    let info = await transporter.sendMail(mailOptions);
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};

const googleLogin = async (req, res, next) => {
  try {
    const CLIENT_ID = process.env.CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const [user] = await User.findOrCreate({
      where: {
        email: payload.email,
      },
      defaults: {
        password: `${payload.email}-${new Date()}-${Math.random() * 100}`,
      },
    });
    const payloadFromServer = signToken({
      id: user.id,
      email: user.email,
    });
    res.status(200).json({
      access_token: payloadFromServer,
    });
  } catch (error) {
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
  sendEmail,
  googleLogin,
};
