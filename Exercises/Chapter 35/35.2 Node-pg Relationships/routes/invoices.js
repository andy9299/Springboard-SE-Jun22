const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

let router = new express.Router();

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `
      SELECT id, comp_code
      FROM invoices 
      ORDER BY id
      `
    );

    return res.json({ "invoices": result.rows });
  }

  catch (err) {
    return next(err);
  }
});


router.get("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    const result = await db.query(
      `
      SELECT i.id, i.amt, i.paid, i.add_date, i.paid_date, c.code, c.name, c.description
      FROM invoices AS i
      INNER JOIN companies AS c ON (i.comp_code = c.code)
      WHERE id =$1
      `,
      [id]
    );
    if (result.rows.length == 0) {
      throw new ExpressError(`No invoice with id: ${id}`, 404);
    }
    let data = result.rows[0];
    let invoice = {
      id: data.id,
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date,
      company: {
        code: data.code,
        name: data.name,
        description: data.description
      }
    };
    return res.json({ "invoice": invoice });
  }
  catch (err) {
    return next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let { comp_code, amt } = req.body;
    const result = await db.query(
      `
      INSERT INTO invoices (comp_code, amt) 
      VALUES ($1, $2) 
      RETURNING id, comp_code, amt, paid, add_date, paid_date
      `,
      [comp_code, amt]);

    return res.status(201).json({ "invoice": result.rows[0] });
  }
  catch (err) {
    return next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { amt, paid } = req.body;
    let paidDate = null;

    const currResult = await db.query(
      `
      SELECT paid, paid_date
      FROM invoices
      WHERE id = $1
      `, [id]
    );

    if (currResult.rows.length == 0) {
      throw new ExpressError(`No invoice with id: ${id}`, 404);
    }

    const currPaidDate = currResult.rows[0].paid_date;
    const currPaid = currResult.rows[0].paid;

    if (paid && !currPaid) {
      paidDate = new Date();
    }
    if (paid && currPaid) {
      paidDate = currPaidDate;
    }

    const result = await db.query(
      `
      UPDATE invoices
      SET amt=$1, paid=$3, paid_date=$4
      WHERE id=$2
      RETURNING id, comp_code, amt, paid, add_date, paid_date
      `,
      [amt, id, paid, paidDate]
    );

    return res.status(200).json({ "invoice": result.rows[0] });
  }
  catch (err) {
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    const result = await db.query(
      `
      DELETE FROM invoices
      WHERE id=$1
      RETURNING id
      `,
      [id]
    );
    if (result.rows.length == 0) {
      throw new ExpressError(`No invoice with id: ${id}`, 404);
    }
    return res.status(200).json({ "status": "deleted" });
  }
  catch (err) {
    return next(err);
  }
});

module.exports = router;