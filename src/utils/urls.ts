import type { CHAINS } from '~/constants/common';

export const getSymbolURL = (chain: ValueOf<typeof CHAINS>) => {
  const baseURL = '/images/symbol';

  return `${baseURL}/${chain}.png`;
};
