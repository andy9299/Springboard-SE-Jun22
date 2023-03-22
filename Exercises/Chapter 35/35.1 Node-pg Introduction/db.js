/** Database setup for BizTime. */


const { Client } = require("pg");

let DB_URI = {
  database: 'biztime',
  password: 'password'
};

const client = new Client(DB_URI);

client.connect();

module.exports = client;