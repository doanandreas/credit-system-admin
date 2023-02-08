const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// @desc	  Log in
// @route	  POST /auth/login
// @access	Public
exports.login = async (req, res, next) => {
  const { username } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  res.status(200).json({ success: true, ...user });
};
