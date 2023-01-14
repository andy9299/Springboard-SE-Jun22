const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading: ${path}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webcat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.log(`Error reading: ${url}`);
    process.exit(1);
  }
}

let path = process.argv[2];
if (path.startsWith('http')) {
  webcat(path);
} else {
  cat(path);
}