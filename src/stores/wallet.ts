import { atom } from 'recoil';

export type WalletInfo = {
  walletType: 'keystation' | 'ledger' | null;
  HDPath: string | null;
  keystationAccount: string | null;
  address: string | null;
  url: string | null;
};

export const walletInfoState = atom<WalletInfo>({
  key: 'walletInfoState',
  default: {
    walletType: null,
    HDPath: null,
    keystationAccount: null,
    address: null,
    url: null,
  },
});

export const keystationRequestTypeState = atom<string | null>({
  key: 'keystationRequestTypeState',
  default: null,
});
