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
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Customer, {
        through: models.Cart,
        foreignKey: "UserId"
      }),
      User.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: "UserId"
      }),
      User.hasMany(models.Cart, {
        foreignKey: "UserId"
      })
    }
  }
  User.init({
    firstname: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Firstname cannot be empty"}
      }
    },
    lastname: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Firstname cannot be empty"},
        isEmail: {msg: "Invalid email format"}
      },
      unique: {
        args: true,
        msg: "Email already used"
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Password cannot be empty"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};