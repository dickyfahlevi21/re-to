"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_out extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  Product_out.init(
    {
      product_id: DataTypes.INTEGER,
      date: DataTypes.STRING,
      total: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product_out",
    }
  );
  return Product_out;
};
