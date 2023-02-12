const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Invoice = require("./Invoice");

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
    transferDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { paranoid: true }
);

Payment.addHook("beforeCreate", async (payment, _) => {
  const invoice = await payment.getInvoice();
  invoice.paidAmount = BigInt(invoice.paidAmount) + BigInt(payment.amount);

  if (invoice.latestPaymentDate < payment.transferDate)
    invoice.latestPaymentDate = payment.transferDate;

  invoice.save();
});

module.exports = Payment;
