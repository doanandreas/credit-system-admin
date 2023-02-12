const {
  User,
  Car,
  Leasing,
  CarPurchase,
  Invoice,
  Payment,
} = require("../models");
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
    include: ["Car", "Leasing", "Invoices"],
    order: [[Invoice, "term", "asc"]],
  });
  if (!carPurchase)
    throw new ErrorResponse(
      `Car purchase not found with id of ${carPurchaseId}`,
      404
    );
  const { Car: car, Leasing: leasing, Invoices: invoices } = carPurchase;

  let nextTerm;
  let nextInvoiceDate;
  let nextAmt;

  if (invoices.length >= carPurchase.creditDuration) {
    const prevInvoice = invoices[invoices.length - 1];

    nextTerm = prevInvoice.term + 1;

    nextInvoiceDate = new Date(
      prevInvoice.invoiceDate.getFullYear(),
      prevInvoice.invoiceDate.getMonth() + 1,
      2
    );

    nextAmt =
      (BigInt(prevInvoice.remainingAmount) * (100n + BigInt(leasing.rates))) /
      100n;
  } else if (invoices.length > 0) {
    const prevInvoice = invoices[invoices.length - 1];

    nextTerm = prevInvoice.term + 1;

    nextInvoiceDate = new Date(
      prevInvoice.invoiceDate.getFullYear(),
      prevInvoice.invoiceDate.getMonth() + 1,
      2
    );

    const oneTermAmt = BigInt(car.price) / BigInt(carPurchase.creditDuration);
    const cumulativeAmt = oneTermAmt + BigInt(prevInvoice.remainingAmount);
    nextAmt = (cumulativeAmt * (100n + BigInt(leasing.rates))) / 100n;
  } else {
    nextTerm = 1;

    nextInvoiceDate = new Date(
      carPurchase.purchaseDate.getFullYear(),
      carPurchase.purchaseDate.getMonth() + 1,
      2
    );

    const oneTermAmt = BigInt(car.price) / BigInt(carPurchase.creditDuration);
    nextAmt = (oneTermAmt * (100n + BigInt(leasing.rates))) / 100n;
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

// @desc	  Transfer money to pay invoice
// @route	  POST /credit/transfer
// @access	Private
exports.transfer = asyncHandler(async (req, res, next) => {
  const { amount, transferDate, invoiceId } = req.body;

  const user = await User.findByPk(req.user.username);
  const invoice = await Invoice.findByPk(invoiceId, { include: "CarPurchase" });

  if (!invoice)
    throw new ErrorResponse(`Invoice not found with id of ${invoiceId}`, 404);
  if (invoice.CarPurchase.UserUsername !== req.user.username)
    throw new ErrorResponse(
      `User mismatch. Please transfer only to invoice made by yourself`
    );
  if (BigInt(amount) > user.balance)
    throw new ErrorResponse(
      `Transfer amount ${amount} bigger than user balance ${user.balance}`,
      400
    );

  const parsedDate = new Date(transferDate);
  if (parsedDate < invoice.invoiceDate || invoice.deadlineDate < parsedDate)
    throw new ErrorResponse(
      `Transfer date ${transferDate} outside invoice range`
    );

  user.balance = BigInt(user.balance) - BigInt(amount);
  await user.save();

  const payment = await Payment.create({
    amount,
    transferDate: parsedDate,
    InvoiceId: invoiceId,
  });

  res.status(200).json({
    success: true,
    payment,
  });
});
