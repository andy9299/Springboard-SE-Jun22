// add whatever parameters you deem necessary
function separatePositive(arr) {
  let negIndex = arr.length - 1;
  let posIndex = 0;
  while (posIndex < negIndex) {
    if (arr[posIndex] < 0 && arr[negIndex] > 0) {
      [arr[posIndex], arr[negIndex]] = [arr[negIndex], arr[posIndex]];
      negIndex -= 1;
      posIndex += 1;
    }
    else {
      if (arr[posIndex > 0]) posIndex += 1;
      else negIndex -= 1;
    }

  }
}
