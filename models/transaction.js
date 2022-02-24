"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: "UserId" });
      Transaction.belongsTo(models.Price, { foreignKey: "PriceId" });
    }
  }
  Transaction.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: DataTypes.INTEGER,
      PriceId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      MovieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (transaction) => {
          transaction.status = "pending";
        },
      },
      modelName: "Transaction",
    }
  );
  return Transaction;
};
