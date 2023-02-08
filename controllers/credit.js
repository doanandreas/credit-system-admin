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
