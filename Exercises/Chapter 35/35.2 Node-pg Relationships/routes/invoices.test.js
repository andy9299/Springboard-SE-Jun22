process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

beforeEach(async () => {
  await db.query("DELETE FROM invoices");
  await db.query("DELETE FROM companies");
  await db.query("SELECT setval('invoices_id_seq', 1, false)");

  await db.query(`
    INSERT INTO companies
    VALUES ('apple', 'Apple Computer', 'Maker of OSX'),
    ('ibm', 'IBM', 'Big blue');
  `);

  await db.query(`
    INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
    VALUES ('apple', 100, false, '2023-01-01', null),
    ('apple', 200, true, '2023-01-01', '2023-01-02'), 
    ('ibm', 300, false, '2023-02-02', null)
    `);
});

afterAll(async () => {
  await db.end();
});

describe("GET /", function () {

  test("It should respond with array of invoices", async function () {
    const response = await request(app).get("/invoices");
    expect(response.body).toEqual({
      "invoices": [
        { id: 1, comp_code: "apple" },
        { id: 2, comp_code: "apple" },
        { id: 3, comp_code: "ibm" },
      ]
    });
  });

});

describe("GET /id", function () {

  test("It should respond with array of invoices", async function () {
    const response = await request(app).get("/invoices/1");
    expect(response.body).toEqual({
      "invoice": {
        id: 1,
        amt: 100,
        paid: false,
        add_date: '2023-01-01T05:00:00.000Z',
        paid_date: null,
        company: {
          code: 'apple',
          description: 'Maker of OSX',
          name: 'Apple Computer'
        }
      }
    });
  });

  test("It should respond with 404 for non-existent invoice", async function () {
    const response = await request(app).get("/invoices/99999999");
    expect(response.status).toEqual(404);
  });

});

describe("POST /", function () {

  test("It should add an invoice", async function () {
    const response = await request(app).post("/invoices").send({ amt: 111, comp_code: "apple" });
    expect(response.body).toEqual({
      "invoice": {
        id: 4,
        amt: 111,
        paid: false,
        add_date: expect.any(String),
        paid_date: null,
        comp_code: "apple"
      }
    });
  });

  test("It should respond with 500 with error in data", async function () {
    const response = await request(app).post("/invoices").send({});
    expect(response.status).toEqual(500);
  });

});

describe("PUT /", function () {

  test("It should update an invoice", async function () {
    const response = await request(app).put("/invoices/1").send({ amt: 1111, paid: false });
    expect(response.body).toEqual(
      {
        "invoice": {
          id: 1,
          comp_code: 'apple',
          paid: false,
          amt: 1111,
          add_date: expect.any(String),
          paid_date: null,
        }
      }
    );
  });

  test("It should return 404 for non-existent invoice", async function () {
    const response = await request(app).put("/invoices/9999").send({ amt: 1111 });
    expect(response.status).toEqual(404);
  });

  test("It should return 500 for error in data", async function () {
    const response = await request(app).put("/invoices/1").send({});
    expect(response.status).toEqual(500);
  });
});

describe("DELETE /", function () {

  test("It should delete an invoice", async function () {
    const response = await request(app).delete("/invoices/1");
    expect(response.body).toEqual({ status: "deleted" });
  });

  test("It should return 404 for non-existent invoice", async function () {
    const response = await request(app).delete("/invoices/9999");
    expect(response.status).toEqual(404);
  });

});