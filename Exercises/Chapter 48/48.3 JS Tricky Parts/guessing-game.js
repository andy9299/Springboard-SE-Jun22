function guessingGame() {
  const randomNum = Math.floor(Math.random() * 100);
  let guesses = 0;
  let isFinsihed = false;
  return (function game(num) {
    if (isFinsihed) return "The game is over, you already won!";
    guesses += 1;
    if (num > randomNum) return `${num} is too high!`;
    if (num < randomNum) return `${num} is too low!`;
    isFinsihed = true;
    return `You win! You found ${randomNum} in ${guesses} guesses.`;
  });
}

module.exports = { guessingGame };
