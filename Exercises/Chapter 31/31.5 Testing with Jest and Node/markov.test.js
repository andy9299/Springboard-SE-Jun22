const { MarkovMachine } = require('./markov');
const DEFAULT_LENGTH = 100;


describe('MarkovMachine test', function () {

  test('makeChains', function () {
    let mm = new MarkovMachine("a b c d a c d");
    expect(mm.wordChains).toEqual(new Map([
      ['a', ['b', 'c']],
      ['b', ['c']],
      ['c', ['d', 'd']],
      ['d', ['a']]
    ]));
  });
  test('selectRandom', function () {
    expect([1, 2, 3, 4]).toContain(MarkovMachine.selectRandom([1, 2, 3, 4]));
  });
});