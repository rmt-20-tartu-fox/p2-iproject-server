const nodemailer = require("nodemailer");
const { User } = require("../models/user");
const cron = require("node-cron");
const fs = require("fs");

function sendEmail(emailUser) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "recipenice1@gmail.com",
      pass: "nicerecipe18",
    },
  });

  const mailOptions = {
    from: "recipenice1@gmail.com",
    to: emailUser,
    subject: "HELLO COOKING LOVER!!!",
    text: "You have register to NICE RECIPE, LETS COOK RIGHT NOW!!!!",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log("Email sent: " + info.response);
  });
}

module.exports = { sendEmail };
