import { useState } from 'react';
import cx from 'clsx';
import { useSetRecoilState } from 'recoil';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import type { TextFieldProps } from '@mui/material';
import { IconButton, TextField } from '@mui/material';

import Button from '~/components/Button';
import Signin from '~/components/Keystation/Signin';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { loaderState } from '~/stores/loader';
import { walletInfoState } from '~/stores/wallet';

import styles from './index.module.scss';

type HdPathProps = {
  className?: string;
};

export default function HdPath({ className }: HdPathProps) {
  const [isOpenedSignin, setIsOpenedSignin] = useState(false);
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();
  const setIsShowLoader = useSetRecoilState(loaderState);
  const setWalletInfo = useSetRecoilState(walletInfoState);

  const [path, setPath] = useState(currentWallet.HDPath ? currentWallet.HDPath : currentChain.wallet.hdPath);

  const handleOnClick = () => {
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
  };

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
