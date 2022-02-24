'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Strats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currentRole: {
        allowNull: false,
        type: Sequelize.STRING
      },
      MapId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Maps',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Op1Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Operators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Op2Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Operators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Op3Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Operators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Op4Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Operators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Op5Id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Operators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Strats');
  }
};