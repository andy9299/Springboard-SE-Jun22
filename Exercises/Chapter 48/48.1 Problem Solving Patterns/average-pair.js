// add whatever parameters you deem necessary
function averagePair(ints, target) {
  let left = 0;
  let right = ints.length - 1;
  let currAvg;
  while (left < right) {
    currAvg = (ints[left] + ints[right]) / 2;;
    if (target > currAvg) { left += 1; }
    if (target < currAvg) { right -= 1; }
    if (target === currAvg) return true;

  }
  return false;
}
