const jwt = require("jsonwebtoken");

const createJsonWebToken = (id) => {
  return jwt.sign({ id }, "PrasanJWTSample", {
    expiresIn: "5m",
  });
};

module.exports = {
  createJsonWebToken,
};
