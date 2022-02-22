'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookMark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookMark.belongsTo(models.City, {foreignKey: "CityId", as: "city"})
      BookMark.belongsTo(models.User, {foreignKey: "UserId", as: "user"})
    }
  }
  BookMark.init({
    name: DataTypes.STRING,
    hotel_id: DataTypes.STRING,
    CityId: DataTypes.STRING,
    UserId: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookMark',
  });
  return BookMark;
};