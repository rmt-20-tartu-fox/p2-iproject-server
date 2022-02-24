"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Transaction);
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      price: DataTypes.INTEGER,
      language: DataTypes.STRING,
      totalTime: DataTypes.STRING,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};
