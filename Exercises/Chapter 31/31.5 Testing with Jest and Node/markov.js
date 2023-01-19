/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let wordChains = new Map();
    for (let i = 0; i < this.words.length - 1; i += 1) {
      let currWord = this.words[i];
      let nextWord = this.words[i + 1];
      if (wordChains.has(currWord)) wordChains.get(currWord).push(nextWord);
      else wordChains.set(currWord, [nextWord]);
    }
    this.wordChains = wordChains;
  }

  static selectRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    let words = Array.from(this.wordChains.keys());
    let word = MarkovMachine.selectRandom(words);
    let output = [];
    while (output.length < numWords) {
      output.push(word);
      word = MarkovMachine.selectRandom(this.wordChains.get(word));
    }
    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine: MarkovMachine
};