const fs = require('fs');
const axios = require('axios');

function getUrls(fileName) {
  result = fs.readFileSync(fileName).toString().split('\n');
  result.pop();
  return result;
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
  let respArr = await Promise.allSettled(arr.map(axios.get));
  respArr.forEach((e, i) => {
    if (e.status === 'rejected') {
      console.error(`Couldn't download ${arr[i]}`);
    } else {
      writeUrlDataHelper(e.value.data, arr[i]);
    }
  });

}

let fileName;
if (process.argv[2]) {
  fileName = process.argv[2];
} else {
  throw new Error('Missing file name');
}
urlsArr = getUrls(fileName);

writeUrlData(urlsArr);