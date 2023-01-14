const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Invalid path: ${path}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}
cat(process.argv[2]);