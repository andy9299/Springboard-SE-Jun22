const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

router.get('/', async function (req, res, next) {
  try {
    const result = await db.query(
      `
      SELECT code, name
      FROM companies
      ORDER BY name
      `
    );
    return res.json({ "companies": result.rows });
  }
  catch (err) {
    return next(err);
  }
});

router.get('/:code', async function (req, res, next) {
  try {
    let code = req.params.code;
    const co_result = await db.query(
      `
      SELECT code, name, description
      FROM companies
      WHERE code = $1
      `,
      [code]
    );
    const in_result = await db.query(
      `
      SELECT id
      FROM invoices
      WHERE comp_code=$1
      `,
      [code]
    );
    if (co_result.rowCount == 0) {
      throw new ExpressError(`${code} does not exist`, 404);
    }
    const company = co_result.rows[0];
    company.invoices = in_result.rows.map(invoice => invoice.id);
    return res.json({ "company": company });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let { name, description } = req.body;
    let code = slugify(name, { lower: true });
    const result = await db.query(
      `
      INSERT INTO companies (code, name, description) 
      VALUES ($1, $2, $3) 
      RETURNING code, name, description
      `,
      [code, name, description]);

    return res.status(201).json({ "company": result.rows[0] });
  }
  catch (err) {
    return next(err);
  }
});

router.put('/:code', async function (req, res, next) {
  try {
    if (!("name" in req.body) || !("description" in req.body)) throw new ExpressError("Missing Data", 500);
    let { name, description } = req.body;
    let code = req.params.code;
    const result = await db.query(
      `
      UPDATE companies
      SET name=$1, description=$2
      WHERE code=$3
      RETURNING code, name, description
      `,
      [name, description, code]);
    if (result.rowCount == 0) {
      throw new ExpressError(`${code} does not exist`, 404);
    }
    return res.status(200).json({ "company": result.rows[0] });
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/:code', async function (req, res, next) {
  try {
    let code = req.params.code;
    const result = await db.query(
      `
      DELETE FROM companies
      WHERE code=$1
      RETURNING code
      `,
      [code]);
    if (result.rowCount == 0) {
      throw new ExpressError(`${code} does not exist`, 404);
    }
    return res.status(200).json({ "status": "deleted" });
  }
  catch (err) {
    return next(err);
  }
});


module.exports = router;