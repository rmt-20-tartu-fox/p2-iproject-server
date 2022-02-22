'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Manga.belongsToMany(models.User, {through : 'MyFavorite', foreignKey : 'MangaId'})
      Manga.hasMany(models.MyFavorite)
    }
  }
  Manga.init({
    malId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    chapters: DataTypes.INTEGER,
    volumes: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    popularity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Manga',
  });
  return Manga;
};