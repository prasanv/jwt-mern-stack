const User = require("../models/user.model");
const { smoothies } = require("../api/smoothies");

const user_smoothies = async (req, res) => {
  User.findById(res.locals.userId)
    .then((user) => {
      const data = {
        id: user.id,
        email: user.email,
        products: smoothies(),
      };
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  user_smoothies,
};
