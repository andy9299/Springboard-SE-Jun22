// attempts convert an array of strings of nums to an array of nums
// returns an error if one of the strings is not a valid number
function numsStringstoNumsArray(numStrings) {
  let res = [];
  for (let i = 0; i < numStrings.length; i++) {
    let val = Number(numStrings[i]);
    if (isNaN(val)) {
      return new Error(`${numStrings[i]} is not a valid number!`);
    }
    res.push(val);
  }
  return res;
}

function mean(nums) {
  return nums.reduce((total, next) => total + next / nums.length, 0);
}

function median(nums) {
  nums.sort((a, b) => a - b);
  let midpoint = Math.floor(nums.length / 2);
  if (nums.length % 2 === 0) {
    return (nums[midpoint] + nums[midpoint - 1]) / 2;
  }
  return nums[midpoint];
}

function mode(nums) {
  let maxfreq = 0;
  let freq = nums.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    if (acc[curr] > maxfreq) maxfreq = acc[curr];
    return acc;
  }, {});
  let modes = [];
  for (let num in freq) {
    if (freq[num] == maxfreq) modes.push(Number(num));
  }
  return modes;
}

module.exports = {
  numsStringstoNumsArray,
  mean,
  median,
  mode
};