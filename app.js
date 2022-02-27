if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();

const cron = require("node-cron");
const nodemailer = require("nodemailer");

const EMAIL_PASSWORD_KEY = process.env.EMAIL_PASSWORD_KEY;

console.log(process.env.NODE_ENV);
const { User } = require("./models");
const { getAllEmail } = require("./helper/email");

const FileController = require("./controllers/file");
const UserController = require("./controllers/user");
const PetController = require("./controllers/pet");
const WeatherController = require("./controllers/weather");

const errorHandler = require("./middleware/errorHandler");
const authentication = require("./middleware/authentication");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "daharrisa@gmail.com",
    pass: EMAIL_PASSWORD_KEY,
  },
  tls: {
    rejectUnAuthorized: true,
  },
});

//default 0 12 * * *
cron.schedule("0 12 * * *", async function () {
  const mailOptions = await getAllEmail();

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(666666666666666, info);
    }
  });
});

app.get("/", (request, response) => {
  response.send("hello world");
});
app.post("/register", UserController.register);
app.post("/login", UserController.login);
app.post("/upload", FileController.upload);
app.get("/weather", WeatherController.getWeather);

app.use(authentication);

app.get("/pet", PetController.checkPet);
app.post("/pet", PetController.createPet);
app.patch("/pet", PetController.feedPet);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
