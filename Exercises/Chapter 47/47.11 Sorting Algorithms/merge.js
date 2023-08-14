function merge(arr1, arr2) {
  let res = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i += 1;
    }
    else {
      res.push(arr2[j]);
      j += 1;
    }
  }
  while (i < arr1.length) {
    res.push(arr1[i]);
    i += 1;
  }
  while (j < arr2.length) {
    res.push(arr2[j]);
    j += 1;
  }
  return res;
}

function mergeSort(arr) {
  if (arr.length < 2) return arr;
  let mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

module.exports = { merge, mergeSort };