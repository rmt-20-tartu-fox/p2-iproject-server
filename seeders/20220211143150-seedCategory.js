'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [{
        name: 'Sepatu',
      },
      {
        name: 'Jersey'
      }
    ]
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Categories', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
