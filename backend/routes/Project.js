const express = require("express");
const {
  fetchAllProject,
  fetchProjectByProjectId,
  fetchProjectByUserId,
  postProject,
  addCommentToProject,
} = require("../controller/Project");
const { isAuth, isAuthorizeToUpdateBlog } = require("../utils");
const router = express.Router();

router.get("/", isAuth, fetchAllProject);
router.get("/:_id", isAuth, fetchProjectByProjectId);
router.post("/", isAuth, postProject);
router.put("/comment/:_id", isAuth, addCommentToProject);
router.get("/user/:_id", isAuth, fetchProjectByUserId);

module.exports = router;
