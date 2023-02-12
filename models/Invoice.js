const { DataTypes } = require("sequelize");
const sequelize = require("./db");

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
  },
  { paranoid: true }
);

module.exports = Invoice;
