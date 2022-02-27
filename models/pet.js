'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pet.belongsTo(models.User, { foreignKey: 'OwnerID' })
    }
  }
  Pet.init({
    name: DataTypes.STRING,
    hunger: DataTypes.INTEGER,
    OwnerID: DataTypes.INTEGER,
    craving: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};