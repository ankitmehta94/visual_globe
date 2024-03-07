export function formatUSCurrency(value, decimals, dollar, separators) {
  var num,
    textNum,
    currencySymbol = dollar ? "$" : "",
    // put thousand deparators
    putSeparators = function (text) {
      var result = "",
        i,
        j,
        numParts = text.split("."),
        intPart = numParts[0],
        decimalPart = numParts[1];

      for (i = intPart.length - 1, j = 0; i >= 0; i--, j++) {
        if (j && j % 3 === 0) {
          result = "," + result;
        }

        result = intPart[i] + result;
      }

      return result + (decimalPart ? "." + decimalPart : "");
    };

  // the value must be a number or string representing a number
  if (value && !isNaN(value)) {
    // this makes a 2 decimal number as a string (rounded)
    textNum = parseFloat("" + value).toFixed(2);
    num = parseFloat(textNum);

    // if decimals = .00
    if (!decimals && num % 1 === 0) {
      return currencySymbol + (separators ? putSeparators("" + num) : "" + num);
    }

    return (
      currencySymbol +
      (separators ? putSeparators(num.toFixed(2)) : num.toFixed(2))
    );
  }

  return "";
}
