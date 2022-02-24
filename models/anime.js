'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.belongsToMany(models.User, {through : 'MyFavorite', foreignKey : 'AnimeId'})
      Anime.hasMany(models.MyFavorite)
    }
  }
  Anime.init({
    malId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    episodes: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    popularity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};