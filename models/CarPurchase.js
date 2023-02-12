const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Invoice = require("./Invoice");

const CarPurchase = sequelize.define(
  "CarPurchase",
  {
    creditDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { paranoid: true }
);

CarPurchase.hasMany(Invoice);
Invoice.belongsTo(CarPurchase);

module.exports = CarPurchase;
