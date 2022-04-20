import { useState } from 'react';
import cx from 'clsx';
import { useSnackbar } from 'notistack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { InstallError, tendermint } from '@cosmostation/extension-client';

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

  const handleOnClickExtension = async () => {
    setIsShowLoader(true);

    try {
      const provider = await tendermint();

      const supportedChains = await provider.getSupportedChains();

      if (![...supportedChains.official, ...supportedChains.unofficial].includes(currentChain.extensionId)) {
        await provider.addChain({
          addressPrefix: currentChain.wallet.prefix,
          baseDenom: currentChain.denom,
          displayDenom: currentChain.symbolName,
          chainId: currentChain.chainId,
          chainName: currentChain.extensionId,
          restURL: currentChain.lcdURL,
          coinGeckoId: currentChain.coingeckoId,
          coinType: currentChain.extensionCoinType,
          decimals: currentChain.decimal,
          imageURL: currentChain.imgURL,
        });
      }
      const account = await provider.requestAccount(currentChain.extensionId);

      const nextWalletInfo: WalletInfo = {
        ...walletInfo,
        keystationAccount: null,
        address: account.address,
        HDPath: currentChain.wallet.hdPath,
        walletType: 'cosmostation-extension',
      };
      sessionStorage.setItem('wallet', JSON.stringify(nextWalletInfo));
      setWalletInfo(nextWalletInfo);

      onSuccess?.(currentChain.path);
    } catch (e) {
      if (e instanceof InstallError) {
        window.open('https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf');
      } else {
        enqueueSnackbar((e as { message?: string }).message, { variant: 'error' });
      }
    } finally {
      setIsShowLoader(false);
    }
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
