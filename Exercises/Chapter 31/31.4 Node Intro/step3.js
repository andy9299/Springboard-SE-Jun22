const fs = require('fs');
const axios = require('axios');
const path = require('path');

function cat(inputPath, writePath) {
  fs.readFile(inputPath, 'utf8', (err, text) => {
    if (err) {
      console.log(`Error reading: ${inputPath}`);
      process.exit(1);
    } else {
      outputHelper(text, writePath);
    }
  });
}

async function webCat(inputPath, outputPath) {
  try {
    let resp = await axios.get(inputPath);
    outputHelper(resp.data, outputPath);
  } catch (err) {
    console.log(`Error reading: ${inputPath}`);
    process.exit(1);
  }
}

function outputHelper(text, outputPath) {
  if (outputPath) {
    fs.writeFile(outputPath, text, 'utf8', function (err) {
      if (err) {
        console.error(`Failed to write ${outputPath} - ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

let writePath, inputPath;

if (process.argv[2] == '--out') {
  writePath = process.argv[3];
  inputPath = process.argv[4];
} else {
  inputPath = process.argv[3];
}

if (inputPath.startsWith('http')) {
  webCat(inputPath, writePath);
} else {
  cat(inputPath, writePath);
}