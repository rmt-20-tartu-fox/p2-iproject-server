'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookMark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookMark.belongsTo(models.User, {foreignKey: "UserId", as: "user"})
    }
  }
  BookMark.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name is required."
        }
      }
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Hotel Id is required."
        }
      }
    },
    room_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Room Id is required."
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: "User Id is required."
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
  }, {
    sequelize,
    modelName: 'BookMark',
  });
  return BookMark;
};