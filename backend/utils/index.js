const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Blog = require("../model/Project");

const generateSalt = async () => {
  return await bcrypt.genSalt(10);
};

module.exports.generateHashPassword = async (password) => {
  const salt = await generateSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports.passwordValidation = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports.generateToken = async (userId, email, name) => {
  try {
    const payload = {
      userId,
      email,
      name,
    };
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.isAuth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const signature = req.headers?.Authorization || req.headers?.authorization;
    console.log(req.headers?.authorization);
    if (!signature) {
      throw new Error("Unauthorized user");
    }
    const token = signature?.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (!payload) {
      throw new Error("Unauthorized user");
    }
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports.isAuthorizeToUpdateBlog = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const blog = await Blog.findOne({ _id });

    if (blog.User == req.user.userId) {
      next();
    } else {
      throw new Error("Only author of this blog allowed to update");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
