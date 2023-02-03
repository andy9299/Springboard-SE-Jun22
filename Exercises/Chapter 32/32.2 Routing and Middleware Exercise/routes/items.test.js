process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");
let item = { name: "candy", price: 1.11 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});

describe("get /items", function () {
  it("Gets all items", async function () {
    const resp = await request(app).get(`/items`);
    const { items } = resp.body;
    expect(resp.statusCode).toBe(200);
    expect(items).toEqual([item]);
  });
});

describe("get /items/:name", function () {
  it("Gets an item", async function () {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(item);
  });

  it("Responds 404 if invalid item", async function () {
    const resp = await request(app).get(`/items/invalidItem`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("post /items/:name", function () {
  it("Creates an item", async function () {
    const resp = await request(app).post(`/items/`).send({ "name": "chocolate", "price": 2.22 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.added.name).toEqual("chocolate");
    expect(resp.body.added.price).toEqual(2.22);
  });
});

describe("patch /items/:name", function () {
  it("Updates an item", async function () {
    const resp = await request(app).patch(`/items/${item.name}`).send({ "name": "chocolate", "price": 2.22 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.updated.name).toEqual("chocolate");
    expect(resp.body.updated.price).toEqual(2.22);
  });
  it("Responds 404 if invalid item", async function () {
    const resp = await request(app).patch(`/items/invalidItem`).send({ "name": "chocolate", "price": 2.22 });
    expect(resp.statusCode).toBe(404);
  });
});

describe("delete /items/:name", function () {
  it("Deletes an item", async function () {
    const resp = await request(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "deleted" });
  });
  it("Responds 404 if invalid item", async function () {
    const resp = await request(app).delete(`/items/invalidItem`);
    expect(resp.statusCode).toBe(404);
  });
});

