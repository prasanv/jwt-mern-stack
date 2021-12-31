const jwt = require("jsonwebtoken");

const createJsonWebToken = (id) => {
  return jwt.sign({ id }, "PrasanJWTSample", {
    expiresIn: "120s",
  });
};

module.exports = {
  createJsonWebToken,
};
