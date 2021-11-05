import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import type { chainPaths } from '~/constants/chain';
import { chains } from '~/constants/chain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { chainState } from '~/stores/chain';

export function useCurrentChain() {
  const currentWallet = useCurrentWallet();

  const chainInfo = chains[useRecoilValue(chainState) as typeof chainPaths[number]];

  return useMemo(() => {
    if (currentWallet.address && isZeroFeeAddress(currentWallet.address)) {
      return {
        ...chainInfo,
        fee: {
          default: '0',
          delegate: '0',
          undelegate: '0',
          redelegate: '0',
          withdraw: '0',
          withdrawReward: '0',
          withdrawCommission: '0',
          modifyWithdrawAddress: '0',
        },
      } as const;
    }

    return chainInfo;
  }, [chainInfo, currentWallet]);
}

function isZeroFeeAddress(address: string) {
  const zeroFeeAddress = [
    'rizon1h5w2xugldpvpldhhu9hlvuq3wzexw5lvu9pah6',
    'rizon15dxy5tkntv27yrch7dpehq2u2el4kmp990qz6w',
    'rizon1rw33uxdzfh5dfszlqlj2zerv6v35e7kyy0h5gw',
    'rizon146ddzema6huym2q33eurrrzy9nh9g4qwz0g09x',
    'rizon1z60acfrp7ufscjjnh6pq7yrduf0m7ads4ra9qv',
  ];

  return zeroFeeAddress.includes(address);
}
