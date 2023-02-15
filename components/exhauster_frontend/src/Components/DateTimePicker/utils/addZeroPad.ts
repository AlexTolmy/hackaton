const addZeroPad = (number: number, symbolsCount: number) => {
  return String(number).padStart(symbolsCount, '0');
};

export default addZeroPad;
