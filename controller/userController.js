const {
  User
} = require('../models/index')
const {
  signToken
} = require('../helpers/jwt')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')

class UserController {
  static register = async (req, res, next) => {
    try {
      const {
        email,
        name,
        password
      } = req.body
      const user = await User.create({
        email,
        name,
        password
      })
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    } catch (error) {
      next(error)
    }
  }

  static login = async (req, res, next) => {
    try {
      const {
        email,
        password
      } = req.body
      const findUser = await User.findOne({
        where: {
          email
        }
      })
      if (findUser) {
        const isValidPassword = bcrypt.compareSync(password, findUser.password)
        if (isValidPassword) {
          const payload = {
            id: findUser.id,
            email: findUser.email
          }
          const token = signToken(payload)
          res.status(200).json({
            access_token: token
          })
        } else {
          throw {
            code: 401,
            name: 'Unauthorized',
            message: 'Invalid email/password'
          }
        }
      } else {
        throw {
          code: 401,
          name: 'Unauthorized',
          message: 'Invalid email/password'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static sendEmail = async (req, res, next) => {
    const {email} = req.body
    let name = email.split('@')[0]
    const output = `
      <h2>Dear ${name} </h2>
      <p>you have successfully created an account at HactivNime</p>
      <ul>  
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
      </ul>
      <p>For any question or further information, please contact us at hactivnime@gmail.com</p>
      <p>Regards, Team Hactiv<p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hactivnime@gmail.com', // generated ethereal user
        pass: '!@#$%Hactiv8' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"HactiveNime" <hactivnime@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }

}

module.exports = UserController