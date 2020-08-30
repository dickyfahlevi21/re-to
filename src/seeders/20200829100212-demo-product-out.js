"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Product_outs", [
      {
        date: new Date(),
        total: 2,
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        total: 2,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Product_outs", null, {});
  },
};
