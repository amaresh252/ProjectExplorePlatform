const express = require("express");
const { LoginUser, CreateUser, Logout } = require("../controller/Auth");
const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", CreateUser);
router.post("/logout", Logout);

module.exports = router;
