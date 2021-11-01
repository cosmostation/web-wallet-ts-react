import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import type { ChainValue } from '~/constants/chain';
import { chains } from '~/constants/chain';
import type { WalletInfo } from '~/stores/wallet';
import { walletInfoState } from '~/stores/wallet';

type SuccessParams = {
  chainInfo: ChainValue;
  address: string;
  account: string;
};

type SigninProps = {
  onSuccess?: (params: SuccessParams) => void;
};

export default function Signin({ onSuccess }: SigninProps) {
  const setWalletInfo = useSetRecoilState(walletInfoState);

  const messageHandler = useCallback(
    (e: MessageEvent) => {
      if (e.origin === 'https://keystation.cosmostation.io') {
        if (e.data) {
          const chainInfo = Object.values(chains).find((chain) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (e.data.address as string).startsWith(chain.wallet.prefix),
          )!;

          setWalletInfo((prev) => {
            const next: WalletInfo = {
              ...prev,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              keystationAccount: e.data.account as string,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              address: e.data.address as string,
              HDPath: chainInfo.wallet.hdPath,
              walletType: 'keystation',
            };

            sessionStorage.setItem('wallet', JSON.stringify(next));
            return next;
          });

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          onSuccess?.({ chainInfo, address: e.data.address as string, account: e.data.account as string });
        }
      }
    },
    [setWalletInfo, onSuccess],
  );

  useEffect(() => {
    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [messageHandler]);

  return <></>;
}
