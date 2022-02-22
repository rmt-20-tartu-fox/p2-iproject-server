'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.hasMany(models.HistoryDetail)
    }
  }
  History.init({
    name: DataTypes.STRING,
    total: DataTypes.INTEGER,
    table: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};