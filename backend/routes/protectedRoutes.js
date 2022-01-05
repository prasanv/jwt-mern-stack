const express = require("express");
const router = express.Router();
const { user_smoothies } = require("../controller/prodController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/user_smoothies", authenticateUser, user_smoothies);

module.exports = router;
