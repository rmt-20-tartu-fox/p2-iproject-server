'use strict';
const fs = require('fs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let defendersData = JSON.parse(fs.readFileSync('./data/operatorsDefend.json', 'utf-8'))
    defendersData.forEach((el) => {
      el["role"] = "Defender"
      el["createdAt"] = new Date
      el["updatedAt"] = new Date
    })
    // console.log(defendersData)
    await queryInterface.bulkInsert('Operators', defendersData, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Operators', null, {})
  }
};
