'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Strat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Strat.belongsTo(models.Map, {foreignKey: 'MapId'})
      Strat.belongsTo(models.Operator, {foreignKey: 'Op1Id'})
      Strat.belongsTo(models.Operator, {foreignKey: 'Op2Id'})
      Strat.belongsTo(models.Operator, {foreignKey: 'Op3Id'})
      Strat.belongsTo(models.Operator, {foreignKey: 'Op4Id'})
      Strat.belongsTo(models.Operator, {foreignKey: 'Op5Id'})
      Strat.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  }
  Strat.init({
    currentRole: DataTypes.INTEGER,
    MapId: DataTypes.INTEGER,
    Op1Id: DataTypes.INTEGER,
    Op2Id: DataTypes.INTEGER,
    Op3Id: DataTypes.INTEGER,
    Op4Id: DataTypes.INTEGER,
    Op5Id: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Strat',
  });
  return Strat;
};