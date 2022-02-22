"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   UserUsers.belongsTo(models.Users, { as: 'Parent', onDelete: 'CASCADE'});
      // UserUsers.belongsTo(models.Users, { as: 'Sibling', onDelete: 'CASCADE' });
      Like.belongsTo(models.User, { as: "User", onDelete: "CASCADE" });
      Like.belongsTo(models.User, { as: "OtherUser", onDelete: "CASCADE" });
      Like.hasOne(models.match, { foreignKey: "LikeId" });
    }
  }
  Like.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      OtherUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
