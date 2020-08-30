"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      /**
       * Banyak User bisa masuk kedalam Product
       **/
      this.hasMany(models.Product, {
        foreignKey: "id_user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
    }
  }
  User.init(
    {
      full_name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      role: DataTypes.STRING,
      salt: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
