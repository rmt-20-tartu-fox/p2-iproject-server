"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Joke extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Joke.init(
    {
      setup: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Setup is required" },
          notNull: { msg: "Setup is required" },
        },
      },
      punchline: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Punchline is required" },
          notNull: { msg: "Punchline is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Joke",
    }
  );
  return Joke;
};
