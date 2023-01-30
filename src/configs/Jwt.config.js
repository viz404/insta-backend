const jwt = require("jsonwebtoken");

const createJwtToken = (payload) => {
  return jwt.sign(payload, "super secret key");
};

const verifyToken = async (token) => {
  try {
    const { name, userId } = await jwt.verify(token, "super secret key");
    return { user: { name, userId }, status: true };
  } catch (error) {
    return { status: false };
  }
};

module.exports = { createJwtToken, verifyToken };
