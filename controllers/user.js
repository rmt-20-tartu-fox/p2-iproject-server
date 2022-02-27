const { User } = require('../models')
const { passwordHasher, passwordComparer } = require('../helper/bcryptjs') 
const { tokenGenerator, tokenConverter } = require('../helper/jwt') 

class UserController {
  static async register (request, response, next) {
    try {
      // obtain the request body
      const { email, password } = request.body
      // create a new user
      const newUserData = await User.create({ 
        email, password: passwordHasher(password)
      })
      response.status(201).json({message: "Register successful"})
    } catch(error) {
      next(error);
    }
  }
  static async login (request, response, next) {
    try {
      console.log(`masuk`);
      const { email, password } = request.body
      const userData = await User.findOne({
        where: {
          email
        }
      })
      // if there is user registered with provided email
      if(userData) {
        const isValidPassword = passwordComparer(password, userData.password)
        if(isValidPassword) {
          const payload = { id: userData.id, email: userData.email }
          // localStorage.setItem('email', email)
          response.status(200).json({
            message: `Login successful`,
            access_token: tokenGenerator(payload),
            OwnerID: userData.id
          })
        } else {
          throw({
            code: 401,
            name: "Unauthorized",
            message: "Invalid email or password"
          })
        }
      } else {
        throw({
          code: 401,
          name: "Unauthorized",
          message: "Invalid email or password"
        })
      }
    } catch(error) {
      next(error)
    }
  }
  static async getAllEmail (request, response, next) {
    try {
      let mailOptions = {
        from: "daharrisa@gmail.com",
        to: null,
        subject: "Hi! Fellow PiBuYo user",
        text: "Your pet seems to be hungry now, you can feed him again.",
      };
      const usersEmailData = await User.findAll({
        attributes: ["email"],
      })
        .then((emailData) => mailOptions.to = emailData)
      return mailOptions
    } catch(error) {
      next(error)
    }
  }
}

module.exports = UserController