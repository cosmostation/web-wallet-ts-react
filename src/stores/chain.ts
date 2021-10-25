import { atom } from 'recoil';

import type { chainPaths } from '~/constants/chain';

export const chainState = atom<typeof chainPaths[number] | null>({
  key: 'chainState',
  default: null,
});
