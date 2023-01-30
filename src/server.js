const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./database/connectDB");
const { userRouter } = require("./routes/User.router");
const { postRouter } = require("./routes/Post.router");
const { checkLoggedin } = require("./middlewares/checkLoggedin");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/users", userRouter);
app.use("/posts", checkLoggedin, postRouter);

// start method
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log("server is running on port: " + PORT);
    });

    await connectDatabase();

    console.log("database successfully connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { startServer };
