import type { chainNames } from '~/constants/chain';
import { chains } from '~/constants/chain';

const chainImgURLs = chains.map((chain) => chain.imgURL);

export const getSymbolURL = (chain: typeof chainNames[number]): typeof chainImgURLs[number] => {
  const chainInfo = chains.find((item) => item.name === chain);

  return chainInfo!.imgURL;
};
