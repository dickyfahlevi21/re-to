"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Product_ins", [
      {
        date: new Date(),
        total: 5,
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        total: 3,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Product_ins", null, {});
  },
};
