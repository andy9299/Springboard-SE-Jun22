function addCommas(num) {
  return num.toLocaleString('en-US', {
    maximumFractionDigits: 20
  });
}
module.exports = addCommas;