if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const errorHandler = require("./midlewares/errorHandler");
const {
  sendEmailByTime,
  findEmail,
  sendEmail,
} = require("./helpers/send_email");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./routes/index");

app.use("/", router);

app.use(errorHandler);

// sendEmailByTime();

app.listen(PORT, () => {
  console.log(`This server is Running at port ${PORT}`);
});

// module.exports = app;
