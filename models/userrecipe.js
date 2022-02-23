"use strict";
const { foreign_key } = require("inflection");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRecipe.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  UserRecipe.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: DataTypes.INTEGER,
      RecipeId: {
        type: DataTypes.STRING,
        // unique: {
        //   args: true,
        //   msg: "RecipeId already registered",
        // },
      },
      recipe: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("recipe"));
        },
        set: function (value) {
          return this.setDataValue("recipe", JSON.stringify(value));
        },
      },
    },
    {
      sequelize,
      modelName: "UserRecipe",
    }
  );
  return UserRecipe;
};
