'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *  allowNull: false,
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email is required" },
        notNull: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" }
      },
      unique: {
        args: true,
        msg: "Email must be unique"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is required" },
        notNull: { msg: "Password is required" },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" },
        notNull: { msg: "Name is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};