import { atom } from 'recoil';

import type { chainNames } from '~/constants/chain';

export const chainState = atom<typeof chainNames[number]>({
  key: 'chainState',
  default: 'cosmos',
});
