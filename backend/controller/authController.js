const User = require("../models/user.model");
const { errorHandler } = require("../components/errorHandler");
const { createJsonWebToken } = require("../components/createJsonWebToken");

const signup_post = async (req, res) => {
  const { email, password, security_question, security_answer } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      security_question,
      security_answer,
    });
    const token = createJsonWebToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 2 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  await User.login(email, password)
    .then((user) => {
      const token = createJsonWebToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 2 });
      res.status(200).json({ user: user._id });
    })
    .catch((err) => {
      const errors = errorHandler(err);
      res.status(400).json({ errors });
    });
};

const logout_post = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.status(200).json("logout successful");
};

module.exports = {
  signup_post,
  login_post,
  logout_post,
};
