process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

let sampleISBN;

beforeEach(async () => {
  let result = await db.query(
    `
    INSERT INTO
      books (isbn, amazon_url,author,language,pages,publisher,title,year)
    VALUES(
      '0691161518',
      'http://a.co/eobPtX2',
      'Matthew Lane',
      'english',
      264,
      'Princeton University Press',
      'Power-Up: Unlocking the Hidden Mathematics in Video Games',
      2017)
    RETURNING isbn
    `
  );
  sampleISBN = result.rows[0].isbn;
});

describe("POST /books", function () {
  test("Create a new book", async function () {
    const response = await request(app).post('/books').send({
      "isbn": "111111111",
      "amazon_url": "http://a.co/test",
      "author": "Test Guy",
      "language": "english",
      "pages": 111,
      "publisher": "Test Publisher",
      "title": "Test Title",
      "year": 1111
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.book).toEqual({
      "isbn": "111111111",
      "amazon_url": "http://a.co/test",
      "author": "Test Guy",
      "language": "english",
      "pages": 111,
      "publisher": "Test Publisher",
      "title": "Test Title",
      "year": 1111
    });
  });
  test("Fail to create book with missing isbn", async function () {
    const response = await request(app).post('/books').send({
      "amazon_url": "http://a.co/test",
      "author": "Test Guy",
      "language": "english",
      "pages": 111,
      "publisher": "Test Publisher",
      "title": "Test Title",
      "year": 1111
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("GET /books", function () {
  test("Gets a list of 1 book", async function () {
    const response = await request(app).get(`/books`);
    const books = response.body.books;
    expect(books).toHaveLength(1);
    expect(books[0].isbn).toBe(sampleISBN);
  });
});

describe("GET /books/:isbn", function () {
  test("Gets a book", async function () {
    const response = await request(app).get(`/books/${sampleISBN}`);
    const book = response.body.book;
    expect(book.isbn).toBe(sampleISBN);
  });
  test("Fails to get book with invalid ISBN", async function () {
    const response = await request(app).get(`/books/2131313`);
    expect(response.statusCode).toBe(404);
  });

});

afterEach(async function () {
  await db.query("DELETE FROM BOOKS");
});


afterAll(async function () {
  await db.end();
});