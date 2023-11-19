'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sprints', [
      { name: "Sprint 1", boardId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Sprint 2", boardId: 2, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sprints', null, {})
  }
};
