const bcrypt = require("bcrypt");
const { createJwtToken } = require("../configs/Jwt.config");

const { UserModel } = require("../models/User.model");

const registerUser = async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;

    const hashed_password = await bcrypt.hash(password, 4);

    const checkEmail = await UserModel.find({ email });

    if (checkEmail.length > 0) {
      res.status(400);
      return res.json({ message: "email already registered", status: false });
    }

    if (name && email && gender && password) {
      await UserModel.create({
        name,
        email,
        gender,
        password: hashed_password,
      });

      res.status(201);
      return res.json({ message: "user successfully created", status: true });
    } else {
      res.status(400);
      return res.json({
        message: "incomplete details provided",
        status: false,
      });
    }
  } catch (error) {
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userWithEmail = await UserModel.find({ email });

    if (userWithEmail.length == 0) {
      res.status(400);
      return res.json({ message: "email not found", status: false });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      userWithEmail[0].password
    );

    if (verifyPassword == false) {
      res.status(401);
      return res.json({ message: "wrong credentials", status: false });
    }

    const token = createJwtToken({
      name: userWithEmail[0].name,
      userId: userWithEmail[0]._id,
    });

    res.json({ token, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

module.exports = { registerUser, loginUser };
