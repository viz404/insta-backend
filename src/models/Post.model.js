const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: String,
  body: String,
  device: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const PostModel = model("Post", postSchema);

module.exports = { PostModel };
