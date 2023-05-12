timeDigitsWord = {
  1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven",
  8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen",
  14: "fourteen", 15: "fifteen", 16: "sixteen", 17: "seventeen", 18: "eighteen",
  19: "nineteen", 20: "twenty", 30: "thirty", 40: "forty", 50: "fifty"
};

function timeWord(time) {
  const hours = +time.slice(0, 2);
  const mins = +time.slice(3, 5);
  let hoursWords = "";
  let minsWords = "";
  if (mins == 0) {
    if (hours == 0) return "midnight";
    if (hours == 12) return "noon";
    minsWords = " o’clock";
  }
  else if (mins <= 9) {
    minsWords = ` oh ${timeDigitsWord[mins]}`;
  }
  else if (mins <= 19) {
    minsWords = ` ${timeDigitsWord[mins]}`;
  }
  else {
    minsWords = ` ${timeDigitsWord[Math.floor(mins / 10) * 10]}`;
    if (timeDigitsWord[mins % 10]) {
      minsWords = `${minsWords} ${timeDigitsWord[mins % 10]}`;
    };
  }
  hoursWords = timeDigitsWord[(hours + 11) % 12 + 1];
  minsWords = `${minsWords}${(Math.floor(hours / 12)) ? " pm" : " am"}`;
  return `${hoursWords}${minsWords}`;
}

module.exports = timeWord;