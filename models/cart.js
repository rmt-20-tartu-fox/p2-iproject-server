'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Product)
      Cart.belongsTo(models.User)
    }
  }
  Cart.init({
    isCheckout: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      isSelect: DataTypes.BOOLEAN,
      quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};