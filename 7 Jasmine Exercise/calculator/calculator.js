

window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const loanAmount = document.getElementById("loan-amount");
  const loanYears = document.getElementById("loan-years");
  const loanRate = document.getElementById("loan-rate");
  loanAmount.value = 10000;
  loanYears.value = 10;
  loanRate.value = .01;
  update();

}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  if (values.years <= (1 / 12)) {
    alert("The term you entered is a month or less");
    return values.amount.toFixed(2);
  }
  //typically rates are a percentage much lower than 100%
  //since the html doesn't specify for the user how to input
  //we take inputs >=1 as a percentage
  if (values.rate >= 1) {
    alert("The rate you entered will be divided by 100 for a percentage");
    values.rate = values.rate / 100;
  }
  const payment = (values.amount /
    ((Math.pow(1 + values.rate / 12, values.years * 12) - 1) /
      (values.rate / 12 * Math.pow(1 + values.rate / 12, values.years * 12)))).toFixed(2);
  console.log(payment);
  return payment;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = "$" + monthly;
}
