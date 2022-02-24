"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.belongsToMany(models.User, {
        through: models.Wishlist,
        foreignKey: "RestaurantId",
      });
      // Restaurant.belongsTo(models.User, {
      //   foreignKey: "UserId",
      // });
      Restaurant.hasMany(models.Review, {
        foreignKey: "RestaurantId",
      });
      Restaurant.hasMany(models.ReviewImage, {
        foreignKey: "RestaurantId",
      });
    }
  }
  Restaurant.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User Id is Required",
          },
          notNull: {
            msg: "User Id is Required",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This Restaurant Name is Already Exists",
        },
        validate: {
          notEmpty: {
            msg: "Restaurant Name is Required",
          },
          notNull: {
            msg: "Restaurant Name is Required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address is Required",
          },
          notNull: {
            msg: "Address is Required",
          },
        },
      },
      lat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Lattitude is Required",
          },
          notNull: {
            msg: "Lattitude is Required",
          },
        },
      },
      lng: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Longitude is Required",
          },
          notNull: {
            msg: "Longitude is Required",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
      },
      mapsUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Maps URL is Required",
          },
          notNull: {
            msg: "Maps URL is Required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is Required",
          },
          notNull: {
            msg: "Description is Required",
          },
        },
      },
      Review: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ratingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
