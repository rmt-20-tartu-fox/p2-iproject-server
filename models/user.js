'use strict';
const Helper = require('../helper/helper.js')

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
      User.hasMany(models.BookMark, {foreignKey: "UserId", as: 'bookmark'})
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name is required."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email must be unique."
      },
      validate: {
        notEmpty: {
          msg: "Email is required."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password is required."
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "costumer",
      validate: {
        notEmpty: {
          msg: "Role is required."
        },
        isIn: {
          args: ['costumer', 'admin']
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "member",
      validate: {
        notEmpty: {
          msg: "Status is required."
        },
        isIn: {
          args: ['member', 'VIP']
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = Helper.bcrypt(user.password)
      }
    }
  });
  return User;
};