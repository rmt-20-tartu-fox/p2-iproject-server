const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const UserController = require('./controller/userController')
const Controller = require('./controller/mangaController')
const { verifyToken } = require('./helpers/jwt')
const { User} = require('./models/index')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/register', UserController.register)
app.post('/login', UserController.login)

app.get('/mangas', Controller.getManga)
app.get('/animes', Controller.getAnime)

app.get('/tops/mangas', Controller.getTopManga)
app.get('/tops/animes', Controller.getTopAnime)

app.use (
  authentication = async (req, res, next) => {
    try {
      const {access_token} = req.headers
      if(!access_token) {
        throw {
          code : 401,
          name: 'JsonWebTokenError',
          message : 'Invalid token'
        }
      }
      const payload = verifyToken(access_token)
      const user = await User.findByPk(+payload.id)
      if (!user) {
        throw {
          name: 'Invalid_User'
        }
      }
      req.currentUser = {
        id: user.id,
        email: user.email
      }
      next()
    } catch (error) {
      next(error)
    }
  }
)

app.get('/myfavoritesmangas', Controller.myFavoritesManga)
app.get('/myfavoritesanimes', Controller.myFavoritesAnime)
app.post('/mangafavorites/:mangaId', Controller.addFavoriteManga)
app.post('/animefavorites/:animeId', Controller.addFavoriteAnime)

app.get('/mangas/:id', Controller.getMangaDetail)
app.get('/animes/:id', Controller.getAnimeDetail)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})