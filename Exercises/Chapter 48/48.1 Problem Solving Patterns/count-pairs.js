// add whatever parameters you deem necessary
function countPairs(arr, target) {
  let counterpart = new Set();
  counter = 0;
  for (let int of arr) {
    if (counterpart.has(target - int)) { counter += 1; }
    else { counterpart.add(int); }
  }
  return counter;
}
