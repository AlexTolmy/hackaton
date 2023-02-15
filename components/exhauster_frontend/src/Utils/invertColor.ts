function padZero(str: string, len = 2) {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

/*
@hex - color which should be converted
@isOnlyBlackAndWhite - flag which means use only white and black result
*/

// Takes some hex color and returns opposite color
// It can be helpful for some cases
// Example, define text color on black background, it will return white
// The same with other colors
function invertColor(hex: string, isOnlyBlackAndWhite?: boolean) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  if (isOnlyBlackAndWhite) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;
  // pad each with zeros and return
  return `#${padZero(r.toString(16))}${padZero(g.toString(16))}${padZero(
    b.toString(16),
  )}`;
}

export default invertColor;
