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
    data: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: "User Id is required."
      },
      get() {
        return JSON.parse(this.getDataValue("data"))
      },
      set(value) {
        return this.setDataValue("data", JSON.stringify(value))
      }
    }
  }, {
    sequelize,
    modelName: 'BookMark',
  });
  return BookMark;
};