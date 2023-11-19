'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('userboards', [
      { userId: 1, boardId: 1, isAdmin: true, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, boardId: 2, isAdmin: false, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('userboards', null, {})
  }
};
