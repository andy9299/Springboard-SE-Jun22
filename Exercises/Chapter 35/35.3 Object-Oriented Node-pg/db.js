/** Database for lunchly */

const pg = require("pg");

DB_NAME = (process.env.NODE_ENV === 'test') ? "lunchly_test" : "lunchly";

let DB_URI = {
  database: DB_NAME,
  password: 'password'
};

const db = new pg.Client(DB_URI);

db.connect();

module.exports = db;
