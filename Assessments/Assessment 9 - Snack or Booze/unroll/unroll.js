function unroll(squareArray) {
  let ansArray = [];
  while (squareArray.length) {
    ansArray.push(...squareArray.shift());
    ansArray.push(...squareArray.map(arr => arr.pop()));
    let lastRow = squareArray.pop();
    if (!lastRow) return ansArray; // cant reverse undefined
    ansArray.push(...lastRow.reverse());
    ansArray.push(...(squareArray.map(arr => arr.shift()).reverse()));
  }
  return ansArray;
}

module.exports = unroll;
