const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Payment = require("./Payment");

const Invoice = sequelize.define(
  "Invoice",
  {
    term: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    invoiceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    latestPaymentDate: DataTypes.DATE,
    deadlineDate: {
      type: DataTypes.VIRTUAL,
      get() {
        return new Date(
          this.invoiceDate.getFullYear(),
          this.invoiceDate.getMonth() + 1,
          1
        );
      },
      set() {
        throw new Error("Can't set virtual field 'deadline' in Invoice");
      },
    },
    paidAmount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    remainingAmount: {
      type: DataTypes.VIRTUAL,
      get() {
        return BigInt(this.amount) - BigInt(this.paidAmount);
      },
      set() {
        throw new Error("Can't set virtual field 'remainingAmount' in Invoice");
      },
    },
  },
  { paranoid: true }
);

Invoice.hasMany(Payment);
Payment.belongsTo(Invoice);

module.exports = Invoice;
