const { Router } = require("express");
const { checkLoggedin } = require("../middlewares/checkLoggedin");

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/User.controller");

const userRouter = Router();

userRouter.get("/", checkLoggedin, getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = { userRouter };
