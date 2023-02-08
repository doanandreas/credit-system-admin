const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

const prisma = new PrismaClient();

// @desc	  Register new user
// @route	  POST /auth/register
// @access	Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, username } = req.body;

  

  res.status(200).json({ success: true });
});

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

  if (!user)
    throw new ErrorResponse(
      "Invalid credentials. Please try a different username",
      401
    );

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
