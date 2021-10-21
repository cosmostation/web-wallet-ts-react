import { useRecoilValue } from 'recoil';

import { walletInfoState } from '~/stores/wallet';

export function useCurrentWallet() {
  return useRecoilValue(walletInfoState);
}
