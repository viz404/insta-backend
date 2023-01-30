const { verifyToken } = require("../configs/Jwt.config");

const checkLoggedin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const { user, status } = await verifyToken(token);

    if (status == false) {
      res.status(401);
      return res.json({
        message: "Unauthorized please login in",
        status: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {}
};

module.exports = { checkLoggedin };
