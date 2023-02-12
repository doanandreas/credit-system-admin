const { User, Car, Leasing, CarPurchase, Invoice } = require("../models");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc	  Deposit money to user
// @route	  POST /credit/deposit
// @access	Private
exports.deposit = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  let user = await User.findByPk(req.user.username);
  user = await user.update({ balance: BigInt(user.balance) + BigInt(amount) });
  user = user.toJSON();

  res.status(200).json({
    success: true,
    data: { ...user, balance: user.balance.toString() },
  });
});

// @desc	  Withdraw user's money
// @route	  POST /credit/withdraw
// @access	Private
exports.withdraw = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  let user = await User.findByPk(req.user.username);
  user = await user.update({ balance: BigInt(user.balance) - BigInt(amount) });
  user = user.toJSON();

  res.status(200).json({
    success: true,
    data: { ...user, balance: user.balance.toString() },
  });
});

// @desc	  Purchase a car by user
// @route	  POST /credit/purchase
// @access	Private
exports.purchase = asyncHandler(async (req, res, next) => {
  const { carId, leasingId, creditDuration, purchaseDate } = req.body;

  const car = await Car.findByPk(carId);

  if (!car) throw new ErrorResponse(`Car not found with ID ${carId}`, 400);

  const leasing = await Leasing.findByPk(leasingId);

  if (!leasing)
    throw new ErrorResponse(`Leasing not found with ID ${leasingId}`, 400);

  const carPurchase = await CarPurchase.create({
    creditDuration,
    UserUsername: req.user.username,
    CarId: carId,
    LeasingId: leasingId,
    ...(purchaseDate && {
      purchaseDate: new Date(purchaseDate),
    }),
  });

  res.status(200).json({
    success: true,
    data: {
      id: carPurchase.id,
      customer: req.user.name,
      leasing: leasing.name,
      car: car.fullName,
      price: car.price.toString(),
    },
  });
});

// @desc	  Generate next invoice for purchase
// @route	  POST /credit/invoice
// @access	Private
exports.invoice = asyncHandler(async (req, res, next) => {
  const { carPurchaseId } = req.body;

  const carPurchase = await CarPurchase.findByPk(carPurchaseId, {
    include: ["Car", "Leasing"],
  });
  const invoices = await Invoice.findAll({
    where: { CarPurchaseId: carPurchaseId },
  });

  let nextTerm;
  let nextInvoiceDate;
  let nextAmt;

  if (invoices.length === 0) {
    nextTerm = 1;

    const { purchaseDate } = carPurchase;
    // TODO: fix date off by one day
    nextInvoiceDate = new Date(
      purchaseDate.getFullYear(),
      purchaseDate.getMonth() + 1,
      2
    );

    const oneTermAmt =
      BigInt(carPurchase.Car.price) / BigInt(carPurchase.creditDuration);
    nextAmt = (oneTermAmt * (100n + BigInt(carPurchase.Leasing.rates))) / 100n;
  }

  const nextInvoice = await Invoice.create({
    term: nextTerm,
    amount: nextAmt,
    invoiceDate: nextInvoiceDate,
    CarPurchaseId: carPurchaseId,
  });

  res.status(200).json({
    success: true,
    invoice: nextInvoice,
  });
});
