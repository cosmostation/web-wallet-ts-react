export function numberFormat(number: number | string) {
  const nf = new Intl.NumberFormat();

  return nf.format(Number(number));
}
