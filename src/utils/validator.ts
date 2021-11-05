import Big from 'big.js';

export function isNumber(number: string) {
  try {
    Big(number);
  } catch {
    return false;
  }
  return true;
}

export function isDecimal(number: string, decimal: number) {
  if (!isNumber(number)) {
    return false;
  }

  const regex = new RegExp(`^([1-9][0-9]*\\.?[0-9]{0,${decimal}}|0\\.[0-9]{0,${decimal}}|0)$`);

  if (!regex.test(number)) {
    return false;
  }

  return true;
}
