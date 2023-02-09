const { PrismaClient } = require("@prisma/client");

const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const prisma = new PrismaClient();

// @desc	  Deposit money to user
// @route	  POST /credit/deposit
// @access	Private
exports.deposit = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  const user = await prisma.user.findUnique({
    where: { username: req.user.username },
  });

  const updated = await prisma.user.update({
    where: { username: req.user.username },
    data: { balance: user.balance + BigInt(amount) },
  });

  res.status(200).json({
    success: true,
    name: user.name,
    balance: updated.balance.toString(),
  });
});

// @desc	  Withdraw user's money
// @route	  POST /credit/withdraw
// @access	Private
exports.withdraw = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  const user = await prisma.user.findUnique({
    where: { username: req.user.username },
  });

  const updated = await prisma.user.update({
    where: { username: req.user.username },
    data: { balance: user.balance - BigInt(amount) },
  });

  res.status(200).json({
    success: true,
    name: user.name,
    balance: updated.balance.toString(),
  });
});

// @desc	  Purchase a car by user
// @route	  POST /credit/purchase
// @access	Private
exports.purchase = asyncHandler(async (req, res, next) => {
  const { carId, leasingId, durationInMonths } = req.body;

  const car = await prisma.car.findUnique({
    where: { id: parseInt(carId) },
  });

  if (!car) throw new ErrorResponse(`Car not found with ID ${carId}`, 400);

  const leasing = await prisma.leasing.findUnique({
    where: { id: parseInt(leasingId) },
  });

  if (!leasing)
    throw new ErrorResponse(`Leasing not found with ID ${leasingId}`, 400);

  await prisma.carPurchase.create({
    data: {
      userId: req.user.id,
      carId,
      leasingId,
      creditDuration: durationInMonths,
    },
  });

  res.status(200).json({
    customer: req.user.name,
    leasing: leasing.leasingName,
    car: `${car.brandName} ${car.groupModelName} ${car.modelName}`,
    price: car.price.toString(),
  });
});
