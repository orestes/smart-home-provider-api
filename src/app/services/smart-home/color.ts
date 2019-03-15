export function dec2hex(dec) {
  return (dec + Math.pow(16, 6)).toString(16).substr(-6);
}

export function hex2dec(input: string) {
  return parseInt(input, 16);
}

export function parseAsRGB(input: number) {
  const hex = dec2hex(input);
  const r = hex2dec(hex.substr(0, 2));
  const g = hex2dec(hex.substr(2, 2));
  const b = hex2dec(hex.substr(4, 2));

  return {r, g, b};
}
