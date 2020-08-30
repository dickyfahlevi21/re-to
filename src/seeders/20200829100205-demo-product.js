"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", [
      {
        name: "molto",
        stock: 10,
        price: 5000,
        id_user: 2,
        url_photo: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "sabun cuci",
        stock: 5,
        price: 2000,
        id_user: 2,
        url_photo: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "kain pel",
        stock: 2,
        price: 50000,
        id_user: 3,
        url_photo: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
