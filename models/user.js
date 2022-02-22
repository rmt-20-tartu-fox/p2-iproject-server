"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Restaurant, {
        through: models.Wishlist,
        foreignKey: "UserId",
      });
      User.hasMany(models.Restaurant, {
        foreignKey: "UserId",
      });
      User.hasMany(models.Review, {
        foreignKey: "UserId",
      });
      User.hasMany(models.ReviewImage, {
        foreignKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This Username Already Exists",
        },
        validate: {
          notEmpty: {
            msg: "Username is Required",
          },
          notNull: {
            msg: "Username is Required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This Email Already Exists",
        },
        validate: {
          notEmpty: {
            msg: "Email is Required",
          },
          notNull: {
            msg: "Email is Required",
          },
          isEmail: {
            msg: "Invalid Email Format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is Required",
          },
          notNull: {
            msg: "Password is Required",
          },
          len: {
            args: [8, 24],
            msg: "Password should be 8 to 24 characters long",
          },
        },
      },
      role: DataTypes.STRING,
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image URL is Required",
          },
          notNull: {
            msg: "Image URL is Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
