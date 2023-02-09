const express = require('express');
let axios = require('axios');
var app = express();
const ExpressError = require("./expressError");

app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    let responses = await Promise.all(req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    }))
      .then(responses => {
        return responses.map(resp => {
          let { bio, name } = resp.data;
          return { bio, name };
        });
      })
      .catch(e => {
        // checking if axios error
        if (e.config.url) {
          throw new ExpressError(`${e.code} : ${e.config.url}`, e.status);
        } throw e;
      });
    // got rate limited so I didn't get to the then part above
    // but if you remove the then part and uncomment below it will work
    // let results = responses.map(resp => {
    //   let { bio, name } = resp.data;
    //   return { bio, name };
    // });
    return res.json(results);
  } catch (err) {
    next(err);
  }
});

// generic catch-all for undefined paths
app.use(function (req, res, next) {
  const e = new ExpressError("Not Found", 404);
  next(e);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let msg = err.message;
  return res.status(status).json({
    error: { msg, status }
  });
});

app.listen(3000);
