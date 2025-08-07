const Project = require("../model/Project");

exports.fetchAllProject = async (req, res) => {
  try {
    console.log("jjjo");
    const projects = await Project.find().populate("user");
    console.log(projects);
    res.status(200).json({ result: projects });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "error in project list fetching" });
  }
};
exports.fetchProjectByProjectId = async (req, res) => {
  const { _id } = req.params;
  try {
    const project = await Project.findById({ _id }).populate("user");
    res.status(200).json({ result: project });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "error in Project  fetching" });
  }
};

exports.fetchProjectByUserId = async (req, res) => {
  const { _id } = req.params;
  try {
    const project = await Project.find({ user: _id }).populate("user");
    res.status(200).json({ result: project });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "error in project  fetching" });
  }
};

exports.postProject = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId, req.body);
    const project = new Project({ ...req.body, user: userId });
    const doc = await project.save();
    res.status(201).json({ result: doc });
  } catch (err) {
    res.status(400).json({ message: "error in post project" });
  }
};

exports.addCommentToProject = async (req, res) => {
  const { _id } = req.params;
  var { comment } = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      _id,
      { $push: { comments: comment } },
      { new: true }
    );
    if (updatedProject) {
      res.status(200).json({ result: updatedProject });
    } else {
      res.status(400).json({ message: "not updated" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
