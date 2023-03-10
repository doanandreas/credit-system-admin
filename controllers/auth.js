const jwt = require("jsonwebtoken");

const { User } = require("../models");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc	  Register new user
// @route	  POST /auth/register
// @access	Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, username } = req.body;

  const user = await User.create({ name, username });

  res.status(200).json({
    success: true,
    data: user.toJSON(),
  });
});

// @desc	  Log in
// @route	  POST /auth/login
// @access	Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findByPk(username);

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
    data: user.toJSON(),
    token,
  });
});

// @desc	  Log out
// @route	  POST /auth/logout
// @access	Private
exports.logout = asyncHandler(async (req, res, next) => {
  // TODO: create token blacklist on Redis
  res.status(200).json({
    success: true,
    message: `Thank You ${req.user.name}, See You Next Time!`,
  });
});
