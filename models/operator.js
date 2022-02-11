'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Operator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Operator.hasMany(models.Strat, {foreignKey: 'Op1Id'})
      Operator.hasMany(models.Strat, {foreignKey: 'Op2Id'})
      Operator.hasMany(models.Strat, {foreignKey: 'Op3Id'})
      Operator.hasMany(models.Strat, {foreignKey: 'Op4Id'})
      Operator.hasMany(models.Strat, {foreignKey: 'Op5Id'})
    }
  }
  Operator.init({
    name: DataTypes.STRING,
    iconUrl: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    ability: DataTypes.STRING,
    quote: DataTypes.STRING,
    content: DataTypes.TEXT,
    role: DataTypes.STRING,
    videoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Operator',
  });
  return Operator;
};