'use strict';

require('dotenv').config()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        birthday: process.env.ADMIN_BIRTHDAY,
        phone: process.env.ADMIN_PHONE,
        password: process.env.ADMIN_PASSWORD,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
};
