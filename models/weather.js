'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Weather.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Weather Name is required."
        }
      }
    },
    imgUrl: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Image Url is required."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Weather',
  });
  return Weather;
};