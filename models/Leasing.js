const { DataTypes } = require("sequelize");
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

module.exports = Leasing;
