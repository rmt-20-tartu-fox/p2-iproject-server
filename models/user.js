"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Users, {
        through: models.Like,
        as: "User",
        foreignKey: "UserId",
      });
      User.belongsToMany(models.Users, {
        through: models.Like,
        as: "OtherUser",
        foreignKey: "OtherUserId",
      });
      User.hasOne(models.Profile, { foreignKey: "UserId" });
      User.hasOne(models.Preference, { foreignKey: "UserId" });
      User.hasOne(models.Geo, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Date of birth is required",
          },
          notEmpty: {
            msg: "Date of birth is required",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 18,
            msg: "Only allows adults age 18 and above",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate(inst) {
          const today = new Date();
          const birthDate = new Date(inst.dateOfbirth);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          inst.age = age;
        },
      },
      modelName: "User",
    }
  );
  return User;
};
