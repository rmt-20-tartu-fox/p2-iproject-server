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
    let mapData = JSON.parse(fs.readFileSync('./data/maps.json', 'utf-8'))
    mapData.forEach((el) => {
      el["createdAt"] = new Date
      el["updatedAt"] = new Date
    })
    // console.log(mapData)
    await queryInterface.bulkInsert('Maps', mapData, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Maps', null, {})
  }
};
