"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Price.belongsToMany(models.User, {
        through: "Transaction",
        foreignKey: "PriceId",
      });
      Price.hasMany(models.Transaction, { foreignKey: "PriceId" });
    }
  }
  Price.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Price",
    }
  );
  return Price;
};
