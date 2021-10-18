import { atom } from 'recoil';

import type { CHAINS } from '~/constants/common';

export const chainState = atom<ValueOf<typeof CHAINS>>({
  key: 'chainState',
  default: 'cosmos',
});
