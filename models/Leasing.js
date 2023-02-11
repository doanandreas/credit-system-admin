const { DataTypes } = require("sequelize");
const CarPurchase = require("./CarPurchase");
const sequelize = require("./db");

const Leasing = sequelize.define("Leasing", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rates: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  terms: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0 },
  },
});

Leasing.hasMany(CarPurchase);
CarPurchase.belongsTo(Leasing);

module.exports = Leasing;
