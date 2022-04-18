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
          coinType: currentChain.wallet.hdPath.split('/')[1],
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
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <div className={styles.container}>
          <div className={styles.connectContainer}>
            <ConnectButton
              name="Connect To Ledger"
              imgURL="/images/signIn/ledger.png"
              onClick={handleOnClickLedger}
              disabled={!currentChain.wallet.support.ledger}
            />
            <div className={styles.verticalDivider} />
            <ConnectButton
              name="Connect To Keystation"
              imgURL="/images/signIn/keystation.png"
              onClick={handleOnClickKeystation}
              disabled={!currentChain.wallet.support.keystation}
            />
          </div>
          <div className={styles.connectContainer}>
            <ConnectButton
              name="Cosmostation Extension"
              imgURL="/images/signIn/keystation.png"
              onClick={handleOnClickExtension}
              disabled={!currentChain.wallet.support.keystation}
            />
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
