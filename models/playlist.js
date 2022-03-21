'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlist.belongsTo(models.User, { foreignKey: "UserId" })
      Playlist.belongsTo(models.Song,  { foreignKey: "SongId" })
    }
  }
  Playlist.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'UserId is required'
        },
        notNull: {
          msg: "UserId is required"
        },
      }
    },
    SongId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'SongId is required'
        },
        notNull: {
          msg: "SongId is required"
        },
      }
    },
    collborative: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};