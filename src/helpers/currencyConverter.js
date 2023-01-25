/** Format a number as a string with commas: 12345.67 => "12,345.67". */

function convertAndFormat(num) {
  // Remember if num is negative so we can reattach that at the very end
  const sign = num < 0 ? "-" : "";
  const posNum = Math.abs(num);

  // Convert to a string and split on either side of the decimal
  const [intStr, decimalStr] = posNum.toString().split(".");

  return (decimalStr !== undefined)
      ? `${sign}${commaInsert(intStr)}.${decimalStr}`
      : `${sign}${commaInsert(intStr)}`;
}

/** Comma-ify a str positive integer: "12345" => "12,345" */

function commaInsert(numStr) {
  // keep track of where the comma should go
  let commaIdx = 0;
  let result = "";

  // loop backwards over num
  for (let i = numStr.length - 1; i >= 0; i--) {
    result = numStr[i] + result;
    commaIdx += 1;

    // add comma after every 3rd character (except at beginning)
    if (commaIdx % 3 === 0 && i !== 0) result = "," + result;
  }

  return result;
}

module.exports = convertAndFormat;