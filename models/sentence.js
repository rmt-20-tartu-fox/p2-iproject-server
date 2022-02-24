'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sentence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sentence.hasOne(models.Song)
    }
  }
  Sentence.init({
    description: { 
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        notNull: {
          msg: "Description is required"
        }
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
    }
  }, {
    sequelize,
    modelName: 'Sentence',
  });
  return Sentence;
};