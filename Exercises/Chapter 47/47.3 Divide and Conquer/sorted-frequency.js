function sortedFrequency(arr, num) {
  let firstIdx = findFirstNum(arr, num);
  if (firstIdx == -1) return firstIdx;
  let lastIdx = findLastNum(arr, num);
  console.log(firstIdx, lastIdx);
  return lastIdx - firstIdx + 1;
}

function findFirstNum(arr, num, low = 0, high = arr.length - 1) {
  if (high >= low) {
    let mid = Math.floor((high + low) / 2);
    if ((mid === 0 || num > arr[mid - 1]) && arr[mid] === num) {
      return mid;
    } else if (num > arr[mid]) {
      return findFirstNum(arr, num, mid + 1, high);
    }
    return findFirstNum(arr, num, low, mid - 1);
  }
  return -1;
}

function findLastNum(arr, num, low = 0, high = arr.length - 1) {
  if (high >= low) {
    let mid = Math.floor((high + low) / 2);
    if ((mid === arr.length - 1 || num < arr[mid + 1]) && arr[mid] === num) {
      return mid;
    } else if (num < arr[mid]) {
      return findLastNum(arr, num, low, mid - 1);
    }
    return findLastNum(arr, num, mid + 1, high);
  }
  return -1;
}

module.exports = sortedFrequency;