'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Restaurant.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    mapsUrl: DataTypes.STRING,
    Review: DataTypes.INTEGER,
    Rating: DataTypes.INTEGER,
    ratingCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};