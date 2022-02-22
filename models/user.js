"use strict";
const { Model } = require("sequelize");
const { encryptPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Meme, {
        through: models.Like,
        foreignKey: "UserId",
      });
      User.hasMany(models.Meme, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Username must be unique",
        },
        allowNull: false,
        validate: {
          notEmpty: { msg: "Username is required" },
          notNull: { msg: "Username is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email must be unique",
        },
        allowNull: false,
        validate: {
          isEmail: { msg: "Invalid email format" },
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
        },
      },
      yearOfBirth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Year of Birth is required" },
          notNull: { msg: "Year of Birth is required" },
        },
      },
    },
    {
      hooks: {
        beforeCreate(user, options) {
          user.password = encryptPass(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
