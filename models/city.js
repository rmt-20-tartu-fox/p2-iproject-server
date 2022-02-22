'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  City.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name is required."
        }
      }
    },
    long: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Longitude is required."
        }
      }
    },
    lat: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Latitude is required."
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
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title is required."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Description is required."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};