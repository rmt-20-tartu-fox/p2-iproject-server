const axios = require('axios')
const Base_Url = 'https://api.jikan.moe/v4'
const {
  Anime,
  Manga,
  MyFavorite
} = require('../models/index')
const {
  Sequelize
} = require('../models')

class Controller {

  static getManga = async (req, res, next) => {
    try {
      const {
        page
      } = req.query
      axios.get(Base_Url + `/manga?page=${page}`)
        .then(resp => {
          res.status(200).json(resp.data.data)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static getTopManga = async (req, res, next) => {
    try {
      axios.get(Base_Url + `/top/manga`)
        .then(resp => {
          let data = resp.data.data.slice(0, 5)
          res.status(200).json(data)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static getMangaDetail = async (req, res, next) => {
    try {
      const {
        id
      } = req.params
      axios.get(Base_Url + `/manga/${id}`)
        .then(resp => {
          res.status(200).json(resp.data.data)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static getAnime = async (req, res, next) => {
    try {
      const {
        page
      } = req.query
      axios.get(Base_Url + `/anime?page=${page}`)
        .then(resp => {
          res.status(200).json(resp.data.data)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static getTopAnime = async (req, res, next) => {
    try {
      axios.get(Base_Url + `/top/anime`)
        .then(resp => {
          let data = resp.data.data.slice(0, 5)
          res.status(200).json(data)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static getAnimeDetail = async (req, res, next) => {
    try {
      const {
        id
      } = req.params
      axios.get(Base_Url + `/anime/${id}`)
        .then(resp => {
          res.status(200).json(resp.data.data)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static addFavoriteManga = async (req, res, next) => {
    try {
      const {
        mangaId
      } = req.params
      const currentUserId = req.currentUser.id
      axios.get(Base_Url + `/manga/${mangaId}`)
        .then(resp => {
          let data = resp.data.data
          let manga = {
            malId: data.mal_id,
            imageUrl: data.images.jpg.large_image_url,
            chapters: data.chapters,
            volumes: data.volumes,
            rating: data.scored.toString(),
            rank: data.rank,
            popularity: data.popularity,
          }

          const mangaCreate = Manga.create(manga)
          return mangaCreate
        })
        .then(resp => {
          const myFavorite = MyFavorite.create({
            UserId: +currentUserId,
            MangaId: +resp.id
          })
          res.status(200).json(myFavorite)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static addFavoriteAnime = async (req, res, next) => {
    try {
      const {
        animeId
      } = req.params
      console.log(1, animeId);
      const currentUserId = req.currentUser.id
      axios.get(Base_Url + `/anime/${animeId}`)
        .then(resp => {
          let data = resp.data.data
          console.log(resp.data);
          let anime = {
            malId: data.mal_id,
            imageUrl: data.images.jpg.large_image_url,
            episodes: data.episodes,
            duration: data.duration,
            rating: data.score.toString(),
            rank: data.rank,
            popularity: data.popularity,
          }

          const animeCreate = Anime.create(anime)
          return animeCreate

        })
        .then(resp => {
          const myFavorite = MyFavorite.create({
            UserId: +currentUserId,
            AnimeId: +resp.id
          })
          res.status(200).json(myFavorite)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static myFavoritesManga = async (req, res, next) => {
    try {
      const currentUserId = req.currentUser.id
      const myFavorite = await MyFavorite.findAll({
        where: {
          UserId: +currentUserId
        },
        include: {
          model: Manga
        },
      })
      let myFavorite1 = myFavorite.filter(el => {
        if (el.Manga) {
          return el.Manga
        }
      })
      res.status(200).json(myFavorite1)
    } catch (error) {
      res.status(500).json(error)

    }
  }

  static myFavoritesAnime = async (req, res, next) => {
    try {
      const currentUserId = req.currentUser.id
      const myFavorite = await MyFavorite.findAll({
        where: {
          UserId: +currentUserId
        },
        include: {
          model: Anime
        },
      })
      let myFavorite1 = myFavorite.filter(el => {
        if (el.Anime) {
          return el.Anime
        }
      })
      console.log(myFavorite);
      res.status(200).json(myFavorite1)
    } catch (error) {
      console.log(error);
      res.status(500).json(error)

    }
  }

}

module.exports = Controller