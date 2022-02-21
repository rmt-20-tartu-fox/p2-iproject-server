'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/handlePassword')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Strat, {foreignKey: 'UserId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username Has Been Taken"
      },
      validate: {
        notNull: {
          msg: 'Username is Required'
        },
        notEmpty: {
          msg: 'Username is Required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email Has Been Taken'
      },
      validate: {
        notNull: {
          msg: 'Email is Required'
        },
        notEmpty: {
          msg: 'Email is Required'
        },
        isEmail: {
          msg: 'Invalid Email Format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is Required'
        },
        notEmpty: {
          msg: 'Password is Required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role is Required'
        },
        notEmpty: {
          msg: 'Role is Required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (value) => {
        value.password = hashPassword(value.password)
        console.log(value.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};