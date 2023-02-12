const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Payment = sequelize.define(
  "Payment",
  {
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  { paranoid: true }
);

module.exports = Payment;
