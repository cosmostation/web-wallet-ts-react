import type { CHAIN } from '~/constants/common';

export const getSymbolURL = (chain: ValueOf<typeof CHAIN>) => {
  const baseURL = '/images/symbol';

  return `${baseURL}/${chain}.png`;
};
