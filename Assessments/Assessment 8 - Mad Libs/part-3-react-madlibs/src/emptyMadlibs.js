const emptyMadlibs = [
  {
    name: "Love",
    words: {
      "noun 1": "",
      "noun 2": "",
      "adjective": "",
      "color": ""
    },
    story: function () {
      return `There was a ${this.words["color"]} ${this.words["noun 1"]} who loved a ${this.words["adjective"]} ${this.words["noun 2"]}.`;
    }
  },
  {
    name: "Wake",
    words: {
      "noun 1": "",
      "noun 2": "",
      "-ing verb": ""
    },
    story: function () {
      return `I woke up to the sound of a(n) ${this.words["noun 1"]} ${this.words["-ing verb"]} on top of a(n) ${this.words["noun 2"]}.`;
    }
  }
];

export default emptyMadlibs

