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
      Product.belongsToMany(models.User, { as: 'Carts', through: 'Cart' })
      Product.belongsTo(models.User, { foreignKey: 'AuthorId' })
      Product.hasMany(models.Cart)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is Required'
        },
        notNull: {
          msg: 'Name cannot be null'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price is Required'
        },
        notNull: {
          msg: 'Price cannot be null'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is Required'
        },
        notNull: {
          msg: 'Description cannot be null'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Stock is Required'
        },
        notNull: {
          msg: 'Stock cannot be null'
        }
      }
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image URL is Required'
        },
        notNull: {
          msg: 'Image URL cannot be null'
        }
      }
    },
    AuthorId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};