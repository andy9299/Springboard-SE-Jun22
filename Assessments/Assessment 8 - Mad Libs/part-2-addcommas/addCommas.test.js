const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });
  test("it should work on numbers with less than 3 digits", () => {
    expect(addCommas(1)).toEqual('1');
    expect(addCommas(-1)).toEqual('-1');
  });
  test("it should work on numbers with greater than 3 digits", () => {
    expect(addCommas(1234567)).toEqual('1,234,567');
    expect(addCommas(-1234567)).toEqual('-1,234,567');
  });
  test("it should work on numbers with decimals", () => {
    expect(addCommas(1.1)).toEqual('1.1');
    expect(addCommas(1234567.123)).toEqual('1,234,567.123');
    expect(addCommas(-1.1)).toEqual('-1.1');
    expect(addCommas(-1234567.123)).toEqual('-1,234,567.123');
  });
});

