import { useEffect, useState } from 'react';
import cx from 'clsx';
import { useSnackbar } from 'notistack';
import { useSetRecoilState } from 'recoil';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import type { TextFieldProps } from '@mui/material';
import { IconButton, TextField } from '@mui/material';

import Button from '~/components/Button';
import Signin from '~/components/Keystation/Signin';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { loaderState } from '~/stores/loader';
import type { WalletInfo } from '~/stores/wallet';
import { walletInfoState } from '~/stores/wallet';
import Ledger, { getBech32FromPK, LedgerError } from '~/utils/ledger';

import styles from './index.module.scss';

type HdPathProps = {
  className?: string;
};

export default function HdPath({ className }: HdPathProps) {
  const [isOpenedSignin, setIsOpenedSignin] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();
  const setIsShowLoader = useSetRecoilState(loaderState);
  const setWalletInfo = useSetRecoilState(walletInfoState);

  const [path, setPath] = useState(currentWallet.HDPath ? currentWallet.HDPath : currentChain.wallet.hdPath);

  const handleOnClick = async () => {
    try {
      if (currentWallet.HDPath === path) {
        return;
      }

      if (currentWallet.walletType === 'keystation') {
        setIsShowLoader(true);
        setIsOpenedSignin(true);

        const myKeystation = new Keystation('http://localhost:3000', currentChain.lcdURL, path);

        const popup = myKeystation.openWindow('signin', currentChain.wallet.prefix);

        const timer = setInterval(() => {
          if (popup.closed) {
            setIsShowLoader(false);
            setIsOpenedSignin(false);
            clearInterval(timer);
          }
        }, 500);
      }

      if (currentWallet.walletType === 'ledger') {
        const ledger = await Ledger();

        setIsShowLoader(true);

        const hdPathArray = path.split('/').map((item) => Number(item));

        const publicKey = await ledger.getPublicKey(hdPathArray);

        const address = getBech32FromPK(currentChain.wallet.prefix, Buffer.from(publicKey.buffer));

        setWalletInfo((prev) => {
          const next: WalletInfo = {
            ...prev,
            keystationAccount: null,
            address,
            HDPath: path,
            walletType: 'ledger',
          };

          sessionStorage.setItem('wallet', JSON.stringify(next));

          return next;
        });
      }
    } catch (e) {
      if (e instanceof LedgerError) {
        enqueueSnackbar('check ledger connection', { variant: 'error' });
      } else {
        enqueueSnackbar((e as { message: string }).message, { variant: 'error' });
      }
      setIsShowLoader(false);
    }
  };

  useEffect(() => {
    setPath(currentChain.wallet.hdPath);
  }, [currentChain]);
  return (
    <>
      <div className={cx(styles.container, className)}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>HD derivation path</div>
          <IconButton
            aria-label="help"
            sx={{
              color: '#5DCFDB',
            }}
          >
            <HelpOutlineRoundedIcon />
          </IconButton>
        </div>
        <div className={styles.inputContainer}>
          <Input value={path} onChange={(event) => setPath(event.currentTarget.value)} />
          <Button sx={{ fontSize: '1.4rem', fontWeight: 'bold' }} onClick={handleOnClick}>
            적용
          </Button>
          <Button sx={{ fontSize: '1.4rem', fontWeight: 'bold' }} onClick={() => setPath(currentChain.wallet.hdPath)}>
            Path 초기화
          </Button>
        </div>
      </div>
      {isOpenedSignin && (
        <Signin
          onSuccess={() => {
            setWalletInfo((prev) => {
              const next = { ...prev, HDPath: path };

              sessionStorage.setItem('wallet', JSON.stringify(next));

              return next;
            });
            setIsShowLoader(false);
          }}
        />
      )}
    </>
  );
}

function Input(props: TextFieldProps) {
  const { sx } = props;
  return (
    <TextField
      variant="outlined"
      sx={{
        width: '20rem',
        '& .MuiOutlinedInput-root': {
          height: '4rem',
          fontSize: '1.4rem',
        },
        '& .MuiOutlinedInput-root:hover': {
          '& > fieldset': {
            borderColor: 'black',
          },
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'black',
        },
        ...sx,
      }}
      {...props}
    />
  );
}
