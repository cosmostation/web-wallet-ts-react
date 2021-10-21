import { atom } from 'recoil';

import type { chainPaths } from '~/constants/chain';

export type WalletInfo = {
  chain: typeof chainPaths[number] | null;
  walletType: 'keystation' | 'ledger' | null;
  ledgerHDPath: string | null;
  keystationAccount: string | null;
  address: string | null;
  url: string | null;
};

export const walletConnectState = atom({
  key: 'walletConnectState',
  default: false,
});

export const walletInfoState = atom<WalletInfo>({
  key: 'walletInfoState',
  default: {
    chain: null,
    walletType: null,
    ledgerHDPath: null,
    keystationAccount: null,
    address: null,
    url: null,
  },
});

export const keystationRequestTypeState = atom<string | null>({
  key: 'keystationRequestTypeState',
  default: null,
});
