"use strict";
const { Model } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      /**
       * Dari product mengarah ke tabel user
       **/
      this.belongsTo(models.User, {
        foreignKey: "id_user",
      });

      /**
       * Banyak Product bisa masuk kedalam Product_in
       **/
      this.hasMany(models.Product_in, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });

      /**
       * Banyak Product bisa masuk kedalam Product_out
       **/
      this.hasMany(models.Product_out, {
        foreignKey: "product_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      url_photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  // Untuk sequelize-paginate
  sequelizePaginate.paginate(Product);
  return Product;
};
