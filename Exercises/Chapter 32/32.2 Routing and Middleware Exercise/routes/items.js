const items = require('../fakeDb');
const express = require('express');
const ExpressError = require('../expressError');

const router = express.Router();

router.get('', (req, res, next) => {
  try {
    return res.json({ items });
  } catch (err) {
    return next(err);
  }
});

router.post('', (req, res, next) => {
  try {
    let newItem = { 'name': req.body.name, 'price': Number(req.body.price) };
    items.push(newItem);
    return res.json({ 'added': newItem });
  } catch (err) {
    return next(err);
  }
});

router.get('/:name', (req, res, next) => {
  try {
    const item = items.find(i => i.name === req.params.name);
    if (!item) throw new ExpressError('Item not found', 404);
    return res.json(item);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:name', (req, res, next) => {
  try {
    const item = items.find(i => i.name === req.params.name);
    if (!item) throw new ExpressError('Item not found', 404);
    item.name = req.body.name;
    item.price = req.body.price;
    return res.json({ 'updated': item });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:name', (req, res, next) => {
  try {
    const itemIndex = items.findIndex(item => item.name === req.params.name);
    console.log(itemIndex);
    if (itemIndex === -1) throw new ExpressError('Item not found', 404);
    items.splice(itemIndex, 1);
    return res.json({ 'message': 'deleted' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
