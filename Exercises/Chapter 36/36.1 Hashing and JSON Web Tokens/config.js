/** Common config for message.ly */

// read .env files and make environmental variables

require("dotenv").config();

const DB_NAME = (process.env.NODE_ENV === "test")
  ? "messagely_test"
  : "messagely";

let DB_URI = {
  database: DB_NAME,
  password: 'password'
};

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;


module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};

