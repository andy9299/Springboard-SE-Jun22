// add whatever parameters you deem necessary
function sameFrequency(int1, int2) {
  let str1 = int1.toString();
  let str2 = int2.toString();
  if (str1.length !== str2.length) return false;
  let count1 = {};
  let count2 = {};
  for (let i = 0; i < str1.length; i++) {
    count1[str1[i]] = (count1[str1[i]] || 0) + 1;
  }

  for (let j = 0; j < str2.length; j++) {
    count2[str2[j]] = (count2[str2[j]] || 0) + 1;
  }

  for (let key in count1) {
    if (count1[key] !== count2[key]) return false;
  }
  return true;
}
