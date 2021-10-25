import { useRecoilValue } from 'recoil';

import type { chainPaths } from '~/constants/chain';
import { chains } from '~/constants/chain';
import { chainState } from '~/stores/chain';

export function useCurrentChain() {
  return chains[useRecoilValue(chainState) as typeof chainPaths[number]];
}
