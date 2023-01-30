const express = require('express');
const app = express();
const ExpressError = require("./expressError");
const { numsStringstoNumsArray, mean, median, mode } = require("./helper");

app.use('/', function (req, res, next) {
  if (!req.query.nums) throw new ExpressError("Missing a comma seperated-list of numbers with query key 'nums'", 400);
  // each number is a string
  let numsStrings = req.query.nums.split(',');
  let numsArray = numsStringstoNumsArray(numsStrings);
  if (numsArray instanceof Error) throw new ExpressError(numsArray.message, 400);
  res.locals.nums = numsArray;
  next();
});

app.get("/mean", function (req, res, next) {
  let resp = {
    'operation': 'mean',
    'value': `${mean(res.locals.nums)}`
  };
  return res.send(resp);
});

app.get("/median", function (req, res, next) {
  let resp = {
    'operation': 'median',
    'value': `${median(res.locals.nums)}`
  };
  return res.send(resp);
});

app.get("/mode", function (req, res, next) {
  let resp = {
    'operation': 'mode',
    'value': `${mode(res.locals.nums)}`
  };
  return res.send(resp);
});

app.get("/all", function (req, res, next) {
  let resp = {
    'operation': 'all',
    'mean': `${mean(res.locals.nums)}`,
    'median': `${median(res.locals.nums)}`,
    'mode': `${mode(res.locals.nums)}`
  };
  return res.send(resp);
});

app.listen(3000, function () {
  console.log(`Server starting on port 3000`);
});
