const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    console.log(token);
    jwt.verify(token, "PrasanJWTSample", (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken);
      }
    });
  } else {
    console.log("no token");
  }
  next();
};

module.exports = {
  authenticateUser,
};
