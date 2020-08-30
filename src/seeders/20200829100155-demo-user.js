"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Contoh data user
     */
    return queryInterface.bulkInsert("Users", [
      {
        full_name: "Dicky Fahlevi",
        username: "dickyf",
        email: "dicky.fahlevi21@gmail.com",
        phone_number: "082114743005",
        role: "admin",
        salt: "***",
        password: "12345",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Dicky Dua",
        username: "dickydua",
        email: "dicky.fahlevi21@gmail.com",
        phone_number: "082134890325",
        role: "supplier",
        salt: "###",
        password: "12345",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
