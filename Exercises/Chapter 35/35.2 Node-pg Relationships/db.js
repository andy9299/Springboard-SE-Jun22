/** Database setup for BizTime. */


const { Client } = require("pg");

DB_NAME = (process.env.NODE_ENV === 'test') ? "biztime_test" : "biztime";

let DB_URI = {
  database: DB_NAME,
  password: 'password'
};

const client = new Client(DB_URI);

client.connect();

module.exports = client;