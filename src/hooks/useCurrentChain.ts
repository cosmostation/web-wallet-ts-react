import { useRecoilValue } from 'recoil';

import type { chainPaths } from '~/constants/chain';
import { chainState } from '~/stores/chain';

export function useCurrentChain() {
  return useRecoilValue(chainState) as typeof chainPaths[number];
}
