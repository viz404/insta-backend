const checkCreatePost = (req, res, next) => {
  const { title, body, device } = req.body;
  let check = true;

  if (title == undefined || typeof title !== "string") {
    check = false;
  }

  if (body == undefined || typeof body !== "string") {
    check = false;
  }

  if (device == undefined || typeof device !== "string") {
    check = false;
  }

  if (check && (device == "PC" || device == "TABLET" || device == "MOBILE")) {
    next();
  } else {
    res.status(400);
    return res.json({ message: "incomplete details", status: false });
  }
};

module.exports = { checkCreatePost };
