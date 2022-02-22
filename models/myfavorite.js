'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyFavorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyFavorite.belongsTo(models.User, {foreignKey: 'UserId'})
      MyFavorite.belongsTo(models.Manga, {foreignKey : 'MangaId'})
      MyFavorite.belongsTo(models.Anime, {foreignKey : 'AnimeId'})
    }
  }
  MyFavorite.init({
    UserId: DataTypes.INTEGER,
    MangaId: DataTypes.INTEGER,
    AnimeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyFavorite',
  });
  return MyFavorite;
};