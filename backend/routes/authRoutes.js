const express = require("express");
const router = express.Router();
const {
  signup_post,
  login_post,
  logout_post,
} = require("../controller/authController");

router.post("/signup", signup_post);
router.post("/login", login_post);
router.post("/logout", logout_post);

module.exports = router;
