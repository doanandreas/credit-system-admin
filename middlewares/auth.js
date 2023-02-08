const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.protectedRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ErrorResponse("Not authorized to access this route", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await prisma.user.findUnique({
      where: { username: decoded.username },
    });

    next();
  } catch (err) {
    throw new ErrorResponse("Not authorized to access this route", 401);
  }
});
