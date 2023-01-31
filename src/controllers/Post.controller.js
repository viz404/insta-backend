const { PostModel } = require("../models/Post.model");

const getPosts = async (req, res) => {
  try {
    const { device, device1, device2, device3 } = req.query;
    const { userId } = req.user;
    let posts = [];

    if (device || device1 || device2 || device3) {
      const array = [];

      if (device) {
        array.push(device);
      }

      if (device1) {
        array.push(device1);
      }

      if (device2) {
        array.push(device2);
      }

      if (device3) {
        array.push(device3);
      }

      const filterObj = { device: { $in: array }, userId };
      posts = await PostModel.find(filterObj);
    } else {
      posts = await PostModel.find({ userId });
    }

    return res.json({ data: posts, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const post = await PostModel.find({ _id: id, userId });

    return res.json({ data: post, status: true });
  } catch (error) {
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, body, device } = req.body;
    const { userId } = req.user;

    const response = await PostModel.create({ title, body, device, userId });

    res.status(201);
    return res.json({ message: "post created successfully", status: true });
  } catch (error) {
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, body, device, id } = req.body;
    const { userId } = req.user;
    const updateObj = {};

    if (title) {
      updateObj.title = title;
    }

    if (body) {
      updateObj.body = body;
    }

    if (device) {
      updateObj.device = device;
    }

    const oldPost = await PostModel.find({ _id: id, userId });

    if (oldPost.length == 0) {
      throw new Error();
    }

    await PostModel.findByIdAndUpdate(id, updateObj);

    return res.json({ message: "update successfull", status: true });
  } catch (error) {
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    const oldPost = await PostModel.find({ _id: id, userId });

    if (oldPost.length == 0) {
      throw new Error();
    }

    await PostModel.findByIdAndDelete(id);

    return res.json({ message: "delete successfull", status: true });
  } catch (error) {
    res.status(500);
    return res.json({ message: "server error", status: false });
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost, getPostById };
