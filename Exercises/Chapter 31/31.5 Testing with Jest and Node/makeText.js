/** Command-line tool to generate Markov text. */

const fs = require("fs");
const { MarkovMachine } = require("./markov");
const axios = require("axios");
const process = require("process");

function generateMarkovText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

function makeText(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.error('Invalid file');
      process.exit(1);
    } else {
      generateMarkovText(data);
    }
  });
}

async function makeTextUrl(url) {
  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`${err} : Can't get URL`);
    process.exit(1);
  }
  generateMarkovText(resp.data);
}

let type = process.argv[2];
let path = process.argv[3];
console.log(type, path);
if (type == 'file') {
  makeText(path);
} else if (type == 'url') {
  makeTextUrl(path);
} else {
  console.error(`Invalid type: ${type}`);
  process.exit(1);
}