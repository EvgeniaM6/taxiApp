export const convertSumToStr = (num: number): string => {
  let str = `${num}`;
  if (!str.includes('.')) str = `${str}.00`;
  const indexDot = str.indexOf('.');
  if (str.slice(indexDot + 1).length < 2) str = `${str}0`;

  if (num >= 1000) {
    const arrDigitsAndComma: Array<string> = [];
    const [strInteger, strFrac] = str.split('.');
    const lastDigitIndex = strInteger.length - 1;
    strInteger
      .split('')
      .reverse()
      .forEach((digit, i) => {
        arrDigitsAndComma.push(digit);
        if (i && !((i + 1) % 3) && i < lastDigitIndex) arrDigitsAndComma.push(',');
      });
    const strIntegerComma = arrDigitsAndComma.reverse().join('');
    str = `${strIntegerComma}.${strFrac}`;
  }
  return str;
};
