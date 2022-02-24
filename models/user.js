'use strict';
const bcrypt = require("bcryptjs")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Balance, {
        foreignKey: "UserId"
      })
      User.hasMany(models.History, {
        foreignKey: "UserId"
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        isEmail: {
          msg: "Invalid email format"
        },
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
      }
    },
  }, {
    sequelize,
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8))
      }
    },
    modelName: 'User',
  });
  return User;
};