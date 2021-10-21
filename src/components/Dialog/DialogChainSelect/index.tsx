/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Dialog from '~/components/Dialog';
import type { ChainPath } from '~/constants/chain';
import { chains } from '~/constants/chain';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentPath } from '~/hooks/useCurrentPath';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { loaderState } from '~/stores/loader';
import type { WalletInfo } from '~/stores/wallet';
import { keystationRequestTypeState, walletInfoState } from '~/stores/wallet';

import styles from './index.module.scss';

type DialogChainSelectProps = {
  open: boolean;
  onClose?: () => void;
};

export default function DialogChainSelect({ open, onClose }: DialogChainSelectProps) {
  const [keystationRequestType, setKeystationRequestType] = useRecoilState(keystationRequestTypeState);
  const [walletInfo, setWalletInfo] = useRecoilState(walletInfoState);
  const setIsShowLoader = useSetRecoilState(loaderState);
  const currentChain = useCurrentChain();
  const history = useHistory();

  const { getPathWithDepth } = useCurrentPath();
  const wallet = useCurrentWallet();

  const chainInfos = Object.values(chains);

  const handleOnClick = (chain: ChainPath) => {
    if (currentChain === chain) {
      onClose?.();
      return;
    }

    if (wallet.address || !!getPathWithDepth(2)) {
      setIsShowLoader(true);
      onClose?.();

      const chainInfo = chains[chain];
      setKeystationRequestType('chainSelectSignIn');

      const myKeystation = new Keystation('http://localhost:3000', chainInfo.lcdURL, chainInfo.wallet.hdPath);

      const popup = myKeystation.openWindow('signin', chainInfo.wallet.prefix);

      const timer = setInterval(() => {
        if (popup.closed) {
          setIsShowLoader(false);
          clearInterval(timer);
        }
      }, 500);
      return;
    }

    history.push(`/${chain}`);
    onClose?.();
  };

  const messageHandler = useCallback(
    (e: MessageEvent) => {
      if (e.origin === 'https://keystation.cosmostation.io' && keystationRequestType === 'chainSelectSignIn') {
        if (e.data) {
          const chainInfo = Object.values(chains).find((chain) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            (e.data.address as string).startsWith(chain.wallet.prefix),
          )!;

          const next: WalletInfo = {
            ...walletInfo,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            keystationAccount: e.data.account as string,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            address: e.data.address as string,
            walletType: 'keystation',
            chain: chainInfo.path,
          };

          setWalletInfo(next);
          setKeystationRequestType(null);

          sessionStorage.setItem('wallet', JSON.stringify(next));

          history.push(`/${chainInfo.path}${getPathWithDepth(2) ? `/${getPathWithDepth(2)}` : ''}`);
        }
      }
    },
    [getPathWithDepth, history, keystationRequestType, setKeystationRequestType, setWalletInfo, walletInfo],
  );

  useEffect(() => {
    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [messageHandler]);

  return (
    <>
      <Dialog open={open} onClose={onClose} title="Select a Chain" maxWidth="lg">
        <div className={styles.container}>
          {chainInfos.map((chaininfo) => (
            <ChainButton
              key={chaininfo.name}
              name={chaininfo.name}
              imgURL={chaininfo.imgURL}
              onClick={() => handleOnClick(chaininfo.path)}
            />
          ))}
        </div>
      </Dialog>
    </>
  );
}

type ChainButtonProps = {
  onClick?: () => void;
  name: string;
  imgURL: string;
};

function ChainButton({ name, imgURL, onClick }: ChainButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button type="button" className={styles.button} onClick={onClick}>
        <div className={styles.imgContainer}>
          <img src={imgURL} alt={name} />
        </div>
        <div className={styles.text}>{name}</div>
      </button>
    </div>
  );
}
