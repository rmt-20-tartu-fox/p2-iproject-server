"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.belongsTo(models.Like);
      Match.hasMany(models.Conversation, { foreignKey: "MatchId" });
    }
  }
  Match.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      LikeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Likes",
          },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      OtherLikeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "OtherLikeId is required",
          },
          notEmpty: {
            msg: "OtherLikeId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Match",
    }
  );
  return Match;
};
