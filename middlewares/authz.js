const { Post, Bookmark } = require("../models")

const authorization = async (req, res, next) => {
  try {
    let idPost = req.params.id
    let idUserLogin = req.userLogin.id
    const getPost = await Post.findOne({
      where: {
        id: idPost,
        authorId: idUserLogin
      }
    })

    if (!getPost) {
      throw {
        code: 403,
        name: 'Forbidden',
        message: 'Permission is not enough!'
      }
    }

    next();

  } catch (error) {
    next(error)
  }
}

const authzEdit = async (req, res, next) => {
  try {
    let idPost = req.params.id
    let idUserLogin = req.userLogin.id

    const getPost = await Post.findOne({
      where: {
        id: idPost,
        authorId: idUserLogin
      }
    })

    if (req.userLogin.role !== 'admin' && !getPost) {
      throw {
        code: 403,
        name: 'Forbidden',
        message: 'Permission is not enough!'
      }
    }

    next()
  } catch (error) {
    next(error)
  }
}

const authzUpdateStatus = async (req, res, next) => {
  try {
    let idUserLogin = req.userLogin.id

    if (req.userLogin.role !== 'admin') {
      throw {
        code: 403,
        name: 'Forbidden Check Role',
        message: 'Only admin can be edit!'
      }
    }

    next()
  } catch (error) {
    next(error)
  }
}

const authzAddCategory = async (req, res, next) =>{
  try {
    let idUserLogin = req.userLogin.id
    if (req.userLogin.role !== 'admin') {
      throw {
        code: 403,
        name: 'Forbidden',
        message: 'Permission is not enough!'
      }
    }
  next()

  } catch (error) {
    next(error)
  }
}

module.exports = {
  authorization,
  authzEdit,
  authzUpdateStatus,
  authzAddCategory,
}