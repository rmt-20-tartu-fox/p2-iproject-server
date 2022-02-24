'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Anime, {through : 'MyFavorite', foreignKey: 'UserId'})
      User.belongsToMany(models.Manga, {through : 'MyFavorite', foreignKey: 'UserId'})
      User.hasMany(models.MyFavorite)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email must be unique'
      },
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        },
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync(6);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};