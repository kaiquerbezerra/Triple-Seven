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
        password: "$2a$10$eT31NhwkoW2HH.AiiGVNsetaUnZ88HiQCVPIQ7xmislUBpkgmSZTe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Usuario Teste",
        email: "teste@gmail.com",
        birthday: "1982-07-10",
        phone: "(81) 91111-11111",
        password: "$2a$10$eT31NhwkoW2HH.AiiGVNsetaUnZ88HiQCVPIQ7xmislUBpkgmSZTe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
};
