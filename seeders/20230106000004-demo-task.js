'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tasks', [
      { name: "Task 1", description: 'Desc 1', sprintId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: "Task 2", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tasks', null, {})
  }
};
