const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const CarPurchase = sequelize.define(
  "CarPurchase",
  {
    creditDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { paranoid: true }
);

module.exports = CarPurchase;
