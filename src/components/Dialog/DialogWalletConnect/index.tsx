import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'clsx';
import { useSnackbar } from 'notistack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import Dialog from '~/components/Dialog';
import Signin from '~/components/Keystation/Signin';
import type { ChainPath } from '~/constants/chain';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { loaderState } from '~/stores/loader';
import type { WalletInfo } from '~/stores/wallet';
import { walletInfoState } from '~/stores/wallet';
import Ledger, { getBech32FromPK, LedgerError } from '~/utils/ledger';

import { ReactComponent as CosmostationIcon } from './assets/Cosmostation.svg';
import { ReactComponent as LedgerIcon } from './assets/Ledger.svg';

import styles from './index.module.scss';

type DialogWalletConnectProps = {
  open: boolean;
  onClose?: () => void;
  onSuccess?: (chain: ChainPath) => void;
};

export default function DialogWalletConnect({ open, onClose, onSuccess }: DialogWalletConnectProps) {
  const [isOpenedSignin, setIsOpenedSignin] = useState(false);

  const setIsShowLoader = useSetRecoilState(loaderState);
  const [walletInfo, setWalletInfo] = useRecoilState(walletInfoState);
  const currentChain = useCurrentChain();
  const { enqueueSnackbar } = useSnackbar();

  const { i18n } = useTranslation();

  const handleOnClickKeystation = () => {
    setIsShowLoader(true);
    setIsOpenedSignin(true);

    const myKeystation = new Keystation(process.env.REACT_APP_HOST, currentChain.lcdURL, currentChain.wallet.hdPath);

    const popup = myKeystation.openWindow('signin', currentChain.wallet.prefix);

    const timer = setInterval(() => {
      if (popup.closed) {
        setIsShowLoader(false);
        clearInterval(timer);
      }
    }, 500);
  };

  const handleOnClickExtension = () => {
    window.location.replace('https://www.mintscan.io/wallet');
  };

  const handleOnClickLedger = async () => {
    try {
      const ledger = await Ledger();

      setIsShowLoader(true);

      if (await ledger.isLocked()) {
        throw new Error(`ledger's status is screen saver`);
      }

      const hdPathArray = currentChain.wallet.hdPath.split('/').map((item) => Number(item));

      const publicKey = await ledger.getPublicKey(hdPathArray);

      const address = getBech32FromPK(currentChain.wallet.prefix, Buffer.from(publicKey.buffer));

      const nextWalletInfo: WalletInfo = {
        ...walletInfo,
        keystationAccount: null,
        address,
        HDPath: currentChain.wallet.hdPath,
        walletType: 'ledger',
      };
      sessionStorage.setItem('wallet', JSON.stringify(nextWalletInfo));
      setWalletInfo(nextWalletInfo);

      onSuccess?.(currentChain.path);
    } catch (e) {
      if (e instanceof LedgerError) enqueueSnackbar('unknown error', { variant: 'error' });

      enqueueSnackbar((e as { message: string }).message, { variant: 'error' });
    } finally {
      setIsShowLoader(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" title="Connect Wallet">
        <div className={styles.container}>
          <div className={styles.connectContainer}>
            <ConnectButton
              onClick={handleOnClickLedger}
              disabled={!currentChain.wallet.support.ledger}
              className={styles.buttonStyle1}
            >
              <LedgerIcon />
            </ConnectButton>
            <div className={styles.centerDiv} />
            <ConnectButton
              onClick={handleOnClickExtension}
              disabled={!currentChain.wallet.support.extension}
              className={styles.buttonStyle1}
            >
              <CosmostationIcon />
            </ConnectButton>
          </div>
          <ConnectButton
            onClick={handleOnClickKeystation}
            disabled={!currentChain.wallet.support.keystation}
            className={styles.buttonStyle2}
          >
            Connect to Keystation
          </ConnectButton>
          <div className={styles.keystationDescriptionContainer}>
            <div>
              <InfoOutlinedIcon sx={{ color: '#CD1A1A', width: '1.2rem', height: '1.2rem' }} />
            </div>
            <div className={styles.keystationTextContainer}>
              {i18n.language === 'ko' ? (
                <>
                  <span style={{ color: '#CD1A1A' }}>키스테이션 서비스</span>가 곧 종료됩니다. 코스모스테이션 웹 지갑을
                  사용하고 싶으신 분들은,{' '}
                  <a
                    href="https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    이곳
                  </a>
                  을 클릭해서 코스모스테이션 월렛 익스텐션을 다운로드하세요. 마이그레이션 가이드 정보는{' '}
                  <a href="https://github.com/cosmostation/keystation" target="_blank" rel="noreferrer">
                    여기
                  </a>
                  를 참고하세요.
                </>
              ) : (
                <>
                  <span style={{ color: '#CD1A1A' }}>Keystation</span> service will soon be terminated. If you wish to
                  use Cosmostation web wallet, please click{' '}
                  <a
                    href="https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>{' '}
                  to download Cosmostation Wallet Extension. Please refer to the migration guide{' '}
                  <a href="https://github.com/cosmostation/keystation" target="_blank" rel="noreferrer">
                    here
                  </a>
                  .
                </>
              )}
            </div>
          </div>
        </div>
      </Dialog>
      {isOpenedSignin && (
        <Signin
          onSuccess={({ chainInfo }) => {
            setIsOpenedSignin(false);
            onSuccess?.(chainInfo.path);
          }}
        />
      )}
    </>
  );
}

type ConnectButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: string | JSX.Element;
};

function ConnectButton({ className, children, disabled, onClick }: ConnectButtonProps) {
  return (
    <button type="button" className={cx(className, styles.button)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
