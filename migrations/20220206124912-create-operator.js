'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Operators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING
      },
      iconUrl: {
        allowNull:false,
        type: Sequelize.STRING
      },
      imageUrl: {
        allowNull:false,
        type: Sequelize.STRING
      },
      ability: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING
      },
      quote: {
        allowNull:false,
        type: Sequelize.STRING
      },
      content: {
        allowNull:false,
        type: Sequelize.TEXT
      },
      role: {
        allowNull:false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Operators');
  }
};