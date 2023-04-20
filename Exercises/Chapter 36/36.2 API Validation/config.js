/** Common config for bookstore. */

const DB_NAME = (process.env.NODE_ENV === "test")
  ? "books_test"
  : "books";

let DB_URI = {
  database: DB_NAME,
  password: 'password'
};

module.exports = { DB_URI };