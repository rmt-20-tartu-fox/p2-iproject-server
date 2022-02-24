'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsToMany(models.User, { through: 'Playlists', foreignKey: "UserId" })
      Song.belongsTo(models.Sentence)
    }
  }
  Song.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        notNull: {
          msg: "Title is required"
        },
      }
    },
    artist: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Artist is required'
        },
        notNull: {
          msg: "Artist is required"
        },
      }
    },
    release_date: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Date is required'
        },
        notNull: {
          msg: "Date is required"
        },
      }
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Image URL is required'
        },
        notNull: {
          msg: "Image URL is required"
        },
      }
    },
    genres: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Genre is required'
        },
        notNull: {
          msg: "Genre is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};