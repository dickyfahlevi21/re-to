"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_in extends Model {
    static associate(models) {
      /**
       * Dari product_in mengarah ke tabel product
       **/
      this.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  Product_in.init(
    {
      product_id: DataTypes.INTEGER,
      date: DataTypes.STRING,
      total: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product_in",
    }
  );
  return Product_in;
};
