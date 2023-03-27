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
    VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
    ('ibm', 'IBM', 'Big blue.');
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

  test("It should return an array of companies", async function () {
    const response = await request(app).get("/companies");
    expect(response.body).toEqual({
      "companies": [
        { code: "apple", name: "Apple Computer" },
        { code: "ibm", name: "IBM" }
      ]
    });
  });
});

describe("GET /apple", function () {

  test("It should return info on 1 company", async function () {
    const response = await request(app).get("/companies/apple");
    expect(response.body).toEqual({
      "company": {
        code: "apple",
        name: "Apple Computer",
        description: "Maker of OSX.",
        invoices: [1, 2],
      }
    });
  });

  test("It should return a 404", async function () {
    const response = await request(app).get("/companies/qwerty");
    expect(response.status).toEqual(404);
  });
});

describe("POST /", function () {

  test("It should add a company", async function () {
    const response = await request(app).post("/companies").send({ name: "Microsoft", description: "Bill Gates" });
    expect(response.body).toEqual({
      "company": {
        code: "microsoft",
        name: "Microsoft",
        description: "Bill Gates"
      }
    });
  });

  test("It should return 500", async function () {
    const response = await request(app).post("/companies").send({ name: "Apple", description: "desc" });
    expect(response.status).toEqual(500);
  });

});

describe("PUT /", function () {

  test("It should update the company info", async function () {
    const response = await request(app).put("/companies/apple").send({ name: "ApplePUT", description: "descriptionPUT" });
    expect(response.body).toEqual({
      "company": {
        code: "apple",
        name: "ApplePUT",
        description: "descriptionPUT"
      }
    });
  });

  test("It should return 404 for non-existent company", async function () {
    const response = await request(app).put("/companies/qwerty").send({ name: "ApplePUT", description: "descriptionPUT" });
    expect(response.status).toEqual(404);
  });

  test("It should return 500 for missing data", async function () {
    const response = await request(app).put("/companies/qwerty").send({});
    expect(response.status).toEqual(500);
  });

});

describe("DELETE /", function () {

  test("It should delete the company", async function () {
    const response = await request(app).delete("/companies/apple");
    expect(response.body).toEqual({ "status": "deleted" });
  });

  test("It should return 404 for non-existent company", async function () {
    const response = await request(app).delete("/companies/qwerty");
    expect(response.status).toEqual(404);
  });

});