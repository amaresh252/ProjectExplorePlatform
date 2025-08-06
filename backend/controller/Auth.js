const User = require("../model/User");
const { passwordValidation, generateToken } = require("../utils");

exports.CreateUser = async (req, res) => {
  try {
    const { username, password, name,role,bio } = req.body;
    const user = new User({ email: username, password, name,role,bio });
    const doc = await user.save();
    const token = await generateToken(doc._id, doc.email, doc.name);
    console.log(token);
    res.status(201).json({ result: doc, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userdata = await User.findOne({ email: username });
    if (userdata) {
      if (passwordValidation(password, userdata.password)) {
        const token = await generateToken(
          userdata._id,
          userdata.email,
          userdata.name
        );
        console.log(token);
        res.status(200).json({ success: true, result: userdata, token });
      } else {
        throw new Error("Wrong credentials");
      }
    } else {
      throw new Error("User Not Found");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.Logout = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
