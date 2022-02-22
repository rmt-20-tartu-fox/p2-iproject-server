'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Customer)
      Cart.belongsTo(models.Product)
      Cart.belongsTo(models.User)
    }
  }
  Cart.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "UserId cannot be empty"}
      }
    },
    ProductId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "ProductId cannot be empty"}
      }
    },
    CustomerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "CustomerId cannot be empty"}
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};