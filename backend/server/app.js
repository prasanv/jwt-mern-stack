const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { DB_URI, PORT } = require("../utils/env_var");
const authRoutes = require("../routes/authRoutes");
const cookieParser = require("cookie-parser");

const User = require("../models/user.model");
const { errorHandler } = require("../components/errorHandler");
const { createJsonWebToken } = require("../components/createJsonWebToken");

const corsConfig = {
  credentials: true,
  origin: "http://localhost:3000",
  //origin: true, // Allows all requests for public API
};

// Middleware
// Enable cors all requests through middleware
app.use(cors(corsConfig));

// Pass cookie parser through middleware
app.use(cookieParser());

//parser middleware before the route declaration part
app.use(express.json()); //parses request in JSON format
app.use(express.urlencoded({ extended: false })); //parses request in urlencoded format

// localhost:8080 base url object
app.get("/", (req, res) => {
  res.send({ name: "prasan" });
});

// authRoutes
app.use(authRoutes);

//Cookies Example
app.get("/set-cookies", (req, res) => {
  res.cookie("responseNewUser", true);
  res.cookie("responseJWT", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVdCJ9", {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  });
  console.log({ reqCookies: req.cookies });
  console.log({ resCookies: res.cookies });
  res.json("set-cookie called successfully");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

// app.post("/signup", (req, res) => {
//   const newUser = req.body;
//   const user = new User(newUser);
//   user
//     .save()
//     .then(() => {
//       const token = createJsonWebToken(user._id);
//       res.cookie("jwt", token);
//       res.status(201).json(user);
//     })
//     .catch((err) => {
//       const errors = errorHandler(err);
//       res.status(400).json({ errors });
//     });
// });

app.get("/delete-many", (req, res) => {
  User.deleteMany()
    .then(() => {
      res.json("All documents in the collection successfully deleted");
    })
    .catch((err) => console.log(err));
});

// Mongo DB Connection and PORT listening
mongoose
  .connect(DB_URI)
  .then((res) => {
    console.log("Mongo DB connection successful");
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
