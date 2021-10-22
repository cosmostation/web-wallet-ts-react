import { useCallback, useEffect } from 'react';
import cx from 'clsx';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Dialog from '~/components/Dialog';
import type { ChainPath } from '~/constants/chain';
import { chains } from '~/constants/chain';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { loaderState } from '~/stores/loader';
import type { WalletInfo } from '~/stores/wallet';
import { walletInfoState } from '~/stores/wallet';

import styles from './index.module.scss';

type DialogWalletConnectProps = {
  open: boolean;
  onClose?: () => void;
  onSuccess?: (chain: ChainPath) => void;
};

export default function DialogWalletConnect({ open, onClose, onSuccess }: DialogWalletConnectProps) {
  const setIsShowLoader = useSetRecoilState(loaderState);
  const [walletInfo, setWalletInfo] = useRecoilState(walletInfoState);
  const currentChain = useCurrentChain();

  const currentChainInfo = chains[currentChain];

  const myKeystation = new Keystation('http://localhost:3000', currentChainInfo.lcdURL, currentChainInfo.wallet.hdPath);

  const messageHandler = useCallback(
    (e: MessageEvent) => {
      if (e.origin === 'https://keystation.cosmostation.io') {
        if (e.data) {
          const next: WalletInfo = {
            ...walletInfo,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            keystationAccount: e.data.account as string,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            address: e.data.address as string,
            walletType: 'keystation',
            chain: currentChain,
          };
          sessionStorage.setItem('wallet', JSON.stringify(next));
          setWalletInfo(next);
          onSuccess?.(currentChain);
        }
      }
    },
    [currentChain, setWalletInfo, walletInfo, onSuccess],
  );

  useEffect(() => {
    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [messageHandler]);

  const handleOnClick = () => {
    setIsShowLoader(true);

    const popup = myKeystation.openWindow('signin', currentChainInfo.wallet.prefix);

    const timer = setInterval(() => {
      if (popup.closed) {
        setIsShowLoader(false);
        clearInterval(timer);
      }
    }, 500);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <div className={styles.container}>
        <div className={styles.connectContainer}>
          <ConnectButton name="Connect To Ledger" imgURL="/images/signIn/ledger.png" disabled />
          <div className={styles.verticalDivider} />
          <ConnectButton name="Connect To Keystation" imgURL="/images/signIn/keystation.png" onClick={handleOnClick} />
        </div>
        <div>지갑 설치 및 사용법</div>
        <div>추후 지원 예정</div>
      </div>
    </Dialog>
  );
}

type ConnectButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  name: string;
  imgURL: string;
};

function ConnectButton({ className, name, imgURL, disabled, onClick }: ConnectButtonProps) {
  return (
    <div className={cx(styles.buttonContainer, className)}>
      <button type="button" className={styles.button} onClick={onClick} disabled={disabled}>
        <div className={styles.imgContainer}>
          <img src={imgURL} alt={name} />
        </div>
        <div className={styles.text}>{name}</div>
      </button>
    </div>
  );
}
