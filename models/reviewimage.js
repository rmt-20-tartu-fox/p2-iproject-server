'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewImage.belongsTo(models.User, {
        foreignKey: "UserId"
      })
      ReviewImage.belongsTo(models.Restaurant, {
        foreignKey: "RestaurantId"
      })
      ReviewImage.belongsTo(models.Review, {
        foreignKey: "ReviewId"
      })
    }
  };
  ReviewImage.init({
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    ReviewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};