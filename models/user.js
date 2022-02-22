'use strict';
const {
  Model
} = require('sequelize');

const { hashPass } = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {foreignKey: 'UserId'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Email is required!'},
        notNull: {msg: 'Email is required!'},
        isEmail: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Password is required!'},
        notNull: {msg: 'Password is required!'},
        checkPass (value){
          if (value.length < 8) {
            throw new Error('Password minimum length is 8')
          }
        }
      },
    }
  }, {
    hooks: {
      beforeCreate(user){
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};