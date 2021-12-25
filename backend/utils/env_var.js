const result = require("dotenv").config({ path: "../../backend/.env" });

if (result.error) {
  throw result.error;
}

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

module.exports = { DB_URI, PORT };
