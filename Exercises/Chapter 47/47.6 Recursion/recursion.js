/** product: calculate the product of an array of numbers. */

function product(nums, idx = 0) {
  if (idx >= nums.length) return 1;
  return nums[idx] * product(nums, idx + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, idx = 0, longestLen = 0) {
  if (idx >= words.length) return longestLen;
  if (words[idx].length > longestLen) longestLen = words[idx].length;
  return longest(words, idx + 1, longestLen);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, idx = 0, resStr = "") {
  if (idx >= str.length) return resStr;
  return everyOther(str, idx + 2, resStr + str[idx]);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  if (arr[idx] == val) return idx;
  if (idx >= arr.length) return -1;
  return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, idx = 0, newStr = "") {
  if (newStr.length === str.length) return newStr;
  newStr += str[str.length - 1 - idx];
  return revString(str, idx + 1, newStr);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strArr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") strArr.push(obj[key]);
    if (typeof obj[key] === "object") strArr.push(...gatherStrings(obj[key]));
  }
  return strArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length) {
  let mid = Math.floor((right + left) / 2);
  if (arr[mid] === val) return mid;
  if (mid === left || mid === right) return -1;
  if (arr[mid] >= val) return binarySearch(arr, val, left, mid);
  return binarySearch(arr, val, mid, right);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
