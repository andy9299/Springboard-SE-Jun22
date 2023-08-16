// add whatever parameters you deem necessary
function twoArrayObject(arr1, arr2) {
  return arr1.reduce((res, curr, idx) => {
    res[curr] = (idx < arr2.length) ? arr2[idx] : null;
    return res;
  }, {});
}
