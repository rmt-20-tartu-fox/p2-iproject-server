'use strict';
const {hashPassword} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: "CustomerId"
      }),
      Customer.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: "CustomerId"
      }),
      Customer.hasMany(models.Cart, {
        foreignKey: "CustomerId"
      })
    }
  }
  Customer.init({
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
    address: DataTypes.STRING,
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Password cannot be empty"}
      }
    },
    imageUrl: DataTypes.TEXT,
    point: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: customer => {
        customer.password = hashPassword(customer.password)
      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};