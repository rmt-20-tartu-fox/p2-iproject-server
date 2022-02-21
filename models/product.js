'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: "ProductId"
      })
      Product.belongsToMany(models.Customer, {
        through: models.Cart,
        foreignKey: "ProductId"
      })
      Product.hasMany(models.Cart, {
        foreignKey: "ProductId"
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};