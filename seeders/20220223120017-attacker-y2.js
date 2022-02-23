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
      let attackerData = JSON.parse(fs.readFileSync('./data/operatorsAttackY2.json', 'utf-8'))
      attackerData.forEach((el) => {
        el["role"] = "Attacker"
        el["createdAt"] = new Date
        el["updatedAt"] = new Date
      })
      // console.log(attackerData)
    await queryInterface.bulkInsert('Operators', attackerData, {})
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
