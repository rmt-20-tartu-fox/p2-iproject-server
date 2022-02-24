const { User } = require("../models");

const getAllEmail = async () => {
  
  const user = await User.findAll({
    attributes: ["email"],
  });
  // mailOptions.to = await User.findAll({
    //   attributes: ["email"],
    // });
    const userEmails = user.map(e => e.email)

    let mailOptions = {
      from: "daharrisa@gmail.com",
      to: userEmails,
      subject: "Hi! Fellow PiBuYo user",
      text: "Your pet seems to be hungry now, you can feed him again.",
    };

  return mailOptions;
};

module.exports = { getAllEmail }