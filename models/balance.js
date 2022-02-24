'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Balance.hasMany(models.History, {
        foreignKey: "BalanceId"
      })
      Balance.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }
  }
  Balance.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId is required"
        },
        notEmpty: {
          msg: "UserId is required"
        },
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "title is required"
        },
        notEmpty: {
          msg: "title is required"
        },
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "type is required"
        },
        notEmpty: {
          msg: "type is required"
        },
      }
    },
    crypto: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "crypto is required"
        },
        notEmpty: {
          msg: "crypto is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Balance',
  });
  return Balance;
};