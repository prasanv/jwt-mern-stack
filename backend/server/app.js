const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { DB_URI, PORT } = require("../utils/env_var");

// Enables All CORS Requests
app.use(cors());

// localhost:8080 base url object
app.get("/", (req, res) => {
  res.send({ name: "prasan" });
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
