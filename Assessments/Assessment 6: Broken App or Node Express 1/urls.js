const fs = require('fs');
const axios = require('axios');

function getUrls(fileName) {
  result = fs.readFileSync(fileName).toString().split('\n');
  result.pop();
  return result;
}

async function getUrlData(url) {
  await axios.get(url).then(resp => {
    writeUrlDataHelper(resp.data, url);
  }).catch(e => {
    console.error(`Couldn't download ${url}`);
  });
}

function writeUrlDataHelper(data, url) {
  let fileName = url.split('/');
  fileName = fileName[2];
  fs.writeFile(fileName + '.txt', data, 'utf8', function (err) {
    if (err) {
      throw new Error(`Failed to write ${url} data`);
    } else {
      console.log(`Wrote to ${fileName}`);
    }
  });
}

async function writeUrlData(arr) {
  let urlDataPromises = arr.map(getUrlData);
  await Promise.all([urlDataPromises]);
}

let fileName;
if (process.argv[2]) {
  fileName = process.argv[2];
} else {
  throw new Error('Missing file name');
}
urlsArr = getUrls(fileName);

writeUrlData(urlsArr);