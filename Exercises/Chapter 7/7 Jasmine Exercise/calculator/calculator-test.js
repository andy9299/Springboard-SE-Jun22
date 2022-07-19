it('should calculate the monthly rate correctly (rate < 1)', function () {
  const values = {
    amount: 12000,
    years: 7,
    rate: .058
  };
  expect(calculateMonthlyPayment(values)).toEqual('174.15');
});

it('should calculate the monthly rate correctly (rate > 1)', function () {
  const values = {
    amount: 12000,
    years: 7,
    rate: 5.8
  };
  expect(calculateMonthlyPayment(values)).toEqual('174.15');
});

it('should calculate the monthly rate correctly (years <= 1 month (1/12)) and always end with 2 decimal places', function () {
  const values = {
    amount: 12000,
    years: .08,
    rate: 5.8
  };
  expect(calculateMonthlyPayment(values)).toEqual('12000.00');
});