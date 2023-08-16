// add whatever parameters you deem necessary
function constructNote(msg, letters) {
  const msgCharFreq = {};
  const lettersCharFreq = {};
  for (let char in msg) {
    msgCharFreq[char] = msgCharFreq[char] + 1 || 1;
  }
  for (let char in letters) {
    lettersCharFreq[char] = lettersCharFreq[char] + 1 || 1;
  }
  for (let char in msgCharFreq) {
    if (!lettersCharFreq[char]) return false;
    if (msgCharFreq[char] > lettersCharFreq[char]) return false;
  }
  return true;
}
