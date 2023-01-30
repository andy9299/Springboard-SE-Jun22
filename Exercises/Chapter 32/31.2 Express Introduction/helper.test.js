const { mean, median, mode } = require("./helper");

describe("Median", function () {
  it("median of array of numbers with even length", function () {
    expect(median([1, 4, -3, 10])).toEqual(2.5);
  });
  it("median of an array of numbers with odd length", function () {
    expect(median([1, 0, 4])).toEqual(1);
  });
});

describe("Mean", function () {
  it("mean of an array of numbers", function () {
    expect(mean([1, 4, -3, 10])).toEqual(3);
  });
});

describe("#findMode", function () {
  it("finds the mode (1 mode)", function () {
    expect(mode([1, 2, 2, 3, 1, 1, 1])).toEqual([1]);
  });
  it("finds the mode (>1 mode)", function () {
    expect(mode([1, 2, 2, 3, 1, 1, 1, 2, 2])).toEqual([1, 2]);
  });
});