"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meme.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: "MemeId",
      });
      Meme.belongsTo(models.User, { foreignKey: "UserId" });
      Meme.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }
  Meme.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required" },
          notNull: { msg: "Title is required" },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image is required" },
          notNull: { msg: "Image is required" },
        },
      },
      nsfw: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: { msg: "NSFW is required" },
          notNull: { msg: "NSFW is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserId is required" },
          notNull: { msg: "UserId is required" },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "CategoryId is required" },
          notNull: { msg: "CategoryId is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Meme",
    }
  );
  return Meme;
};
