const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const badJwt = jwt.sign({ username: "test", admin: false }, "wrong");
const goodJwt = jwt.sign({ username: "test", admin: false }, SECRET_KEY);

const { authUser } = require("./auth");

// TESTS BUG #3
describe("authUser", function () {
  test('works', function () {
    const req = { body: { _token: goodJwt } };
    const res = {};
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authUser(req, res, next);
    expect(req.curr_username).toEqual('test');
  });
  test('fails with invalid token', function () {
    const req = { body: { _token: badJwt } };
    const res = {};
    const next = function (err) {
      expect(err).toBeTruthy();
    };
    authUser(req, res, next);
    expect(req.curr_username).toEqual(undefined);
  });
});
