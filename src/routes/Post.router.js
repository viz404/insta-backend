const { Router } = require("express");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} = require("../controllers/Post.controller");
const { checkCreatePost } = require("../middlewares/Post.middleware");

const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/create", checkCreatePost, createPost);
postRouter.patch("/update", updatePost);
postRouter.delete("/delete", deletePost);

module.exports = { postRouter };
