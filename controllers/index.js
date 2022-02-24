const { User, Bookmark } = require('../models')
const openLibraryApi = require("../apis/openLibraryApi")
const { signToken, verifyToken } = require("../helpers/jwt")
const { comparePass } = require("../helpers/hashPassword")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('337335887389-af6plqi8r6h0lgjdrgthijrvrck10kgn.apps.googleusercontent.com');
const FacebookTokenStrategy = require('passport-facebook-token');
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_ID;



class UserController {
  static postRegister = async (req, res, next) => {
    try {
      const { email, password } = req.body

      const userRegister = await User.create({
        email,
        password
      })
      
      res.status(201).json({message: "Register Succesfull!!", email: userRegister.email})
      
    } catch (error) {
      next(error)
    }
  }

  static postLogin = async (req, res, next) =>{
    try { 
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (user) {
        const isPass = comparePass(password, user.password)
        if (isPass) {
          const payload = {id: user.id, email: user.email}
          const accessToken = signToken(payload)
          res.status(200).json({
            message: 'Login Successfull',
            access_token: accessToken,
            email: user.email
          })
        } else{
          throw {
            code: 401,
            name: 'Unauthorized',
            message: 'Invalid email or password'
          }
        }

      } else{
        throw {
          code: 401,
          name: 'Unauthorized',
          message: 'Invalid email or password'
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static loginGoogle = async (req, res, next) =>{
    try {
      const { token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '337335887389-af6plqi8r6h0lgjdrgthijrvrck10kgn.apps.googleusercontent.com'
      });
  
      const payload = ticket.getPayload()
      
      if (payload) {
        const user = await User.findOne({
          where: {
            email: payload.email,
          }
        })
        if (!user) {
          const createUser = await User.create({
            email: payload.email,
            password: `${payload.name}123%$#%`
          })
          const payloadServer = {id: createUser.id, email: createUser.email}
          const tokenServer = verifyToken(payloadServer)
          res.status(200).json({
            message: 'Login Successfull',
            access_token: tokenServer,
          })

        }

        const payloadServer = {id: user.id, email: user.email}
        const tokenServer = signToken(payloadServer)
        res.status(200).json({
          message: 'Login Successfull',
          access_token: tokenServer
        })
      }
      
    } catch (error) {
      next(error)
    }
    
  }

  static loginFb = async (req, res, next) => {
    try {
      const passport = new FacebookTokenStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        fbGraphVersion: 'v3.0'
        }, function(access_token, refreshToken, profile, done) {
          User.findOrCreate({facebookId: profile.id}, function (error, user) {
            return done(error, user);
          });
        }
      );
      
      const {facebookToken} = req.body
      const userFb = await passport.authenticate(facebookToken)

      console.log(userFb);

    } catch (error) {
      console.log(error);
    }
  }
}

class BooksController{
  static getBookBySubject = async (req, res, next) => {
    try {
      const result = await openLibraryApi.get("/subjects/accessible_book#ebooks=true")
      res.status(200).json(result.data.works)
    } catch (error) {
      next(error)
    }
  }

  static getBookByTitle = async (req, res, next) => {
    try {
      const { title } = req.query
      
      if (title) {
        const result = await openLibraryApi
          .get(`/search?title=${title}`)

        res.status(200).json(result.data.docs)
      } else if(title === ""){
        const result = await openLibraryApi.get("/search?title=clasic")
        res.status(200).json(result.data.docs)
      }
    } catch (error) {
      next(error)
    }
  }
}

class BookmarkController{
  static postBookmark = async(req, res, next)=>{
    try {
      const { id } = req.userLogin
      const {BookId, title} = req.body
      const result = await Bookmark.create({
        UserId: id,
        BookId,
        title,
        status: "Unread"
      })

      res.status(201).json({message: `Add book with id ${result.BookId} successfull !!`})
    } catch (error) {
      next(error)
    }
  }

  static getBookmark = async(req, res, next)=> {
    try {
      const { id } = req.userLogin
      const result = await Bookmark.findAll({
        where: {
          UserId: id
        }
      })
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static deleteBookmark = async(req, res, next) => {
    try {
      const { id } = req.userLogin
      const { bookmarkId } = req.params
      const find = await Bookmark.findByPk(bookmarkId)
      
      if (find) {
        const result = await Bookmark.destroy({
          where: {
            id: find.id,
            UserId: id,
          },
          returning: true
        })
        res.status(200).json({message: `Book ${result.title} success remove from My Book!`})
      } else {
        throw {
          code: 404,
          name: 'Not Found',
          message: 'Book not found!'
        }
      }
      
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  UserController,
  BooksController,
  BookmarkController
}