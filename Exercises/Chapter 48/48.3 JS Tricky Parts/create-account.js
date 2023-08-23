function createAccount(pin, amount = 0) {
  return {
    checkBalance(enteredPin) {
      if (enteredPin === pin) {
        return `$${amount}`;
      }
      return "Invalid PIN.";
    },
    deposit(enteredPin, amt) {
      if (enteredPin !== pin) { return "Invalid PIN."; }
      amount += amt;
      return `Succesfully deposited $${amt}. Current balance: $${amount}.`;
    },
    withdraw(enteredPin, amt) {
      if (enteredPin !== pin) { return "Invalid PIN."; }
      if (amt > amount) { return "Withdrawal amount exceeds account balance. Transaction cancelled."; }
      amount -= amt;
      return `Succesfully withdrew $${amt}. Current balance: $${amount}.`;
    },
    changePin(enteredPin, newPin) {
      if (enteredPin !== pin) { return "Invalid PIN."; }
      pin = newPin;
      return "PIN successfully changed!";
    }
  };
}

module.exports = { createAccount };
