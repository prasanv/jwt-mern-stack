const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "PrasanJWTSample", (err, decodedToken) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.locals.userId = decodedToken.id;
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ name: "JsonWebTokenError", message: "no token found" });
  }
};

module.exports = {
  authenticateUser,
};
