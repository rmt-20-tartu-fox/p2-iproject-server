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
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {msg: "Name cannot be empty"}
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "Price cannot be empty"}
      }
    },
    discount: DataTypes.INTEGER,
    CategoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {msg: "CategoryId cannot be empty"}
      }
    },
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};