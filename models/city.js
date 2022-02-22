'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      City.belongsToMany(models.User, {foreignKey: "UserId", through: 'BookMarks', as: 'user'})
    }
  }
  City.init({
    name: DataTypes.STRING,
    long: DataTypes.STRING,
    lat: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};