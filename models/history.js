'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {
        foreignKey: "UserId"
      })
      History.belongsTo(models.Balance, {
        foreignKey: "BalanceId"
      })
    }
  }
  History.init({
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
    BalanceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "BalanceId is required"
        },
        notEmpty: {
          msg: "BalanceId is required"
        },
      }
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "value is required"
        },
        notEmpty: {
          msg: "value is required"
        },
      }
    },
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};