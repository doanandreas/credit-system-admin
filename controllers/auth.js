const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const prisma = new PrismaClient();

// @desc	  Log in
// @route	  POST /auth/login
// @access	Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({
    success: true,
    name: user.name,
    balance: parseInt(user.balance),
    token,
  });
});
