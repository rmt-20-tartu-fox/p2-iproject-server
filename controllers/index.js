const { User, Profile } = require('../models')
const openLibraryApi = require("../apis/openLibraryApi")

class UserController {
  static postRegister = async (req, res) => {
    try {
      const { firstName, lastName, email, password, address } = req.body

      const userRegister = await User.create({
        email,
        password
      })

      if (userRegister) {
        const userProfile = await Profile.create({
          firstName,
          lastName,
          email: userRegister.email,
          password: userRegister.password,
          address,
          UserId: userRegister.id
        })
        res.status(201).json({message: "succes register", email: userProfile.email})
      }
    } catch (error) {
      res.status(500).json(error.errors.message)
    }
  }

  static postLogin = async (req, res) =>{
    try { 
      const { email, password } = require()
    } catch (error) {
      
    }
  }
}

class BooksController{
  static getBookBySubject = async (req, res) => {
    try {
      const result = await openLibraryApi.get("/subjects/accessible_book#ebooks=true")
      res.status(200).json(result.data.works)
    } catch (error) {
      
    }
  }

  static getBookByTitle = async (req, res) => {
    try {
      const { title } = req.query
      const result = await openLibraryApi.get(`/search?title=${title}`)
      res.status(200).json(result.data.docs)
    } catch (error) {
      res.status(500).json({message: "Internal server error"})
    }
  }
}

module.exports = {
  UserController,
  BooksController
}