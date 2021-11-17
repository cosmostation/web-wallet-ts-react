import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'clsx';
import { useSnackbar } from 'notistack';
import { useSetRecoilState } from 'recoil';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import type { TextFieldProps } from '@mui/material';
import { IconButton, TextField } from '@mui/material';

import Button from '~/components/Button';
import Dialog from '~/components/Dialog';
import Signin from '~/components/Keystation/Signin';
import { CHAIN } from '~/constants/chain';
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
  const [isOpenedPathInfo, setIsOpenedPathInfo] = useState(false);

  const { t } = useTranslation();

  const [path, setPath] = useState('');

  const handleOnClick = async () => {
    try {
      if (currentWallet.HDPath === path) {
        return;
      }

      if (!/^([0-9]+\/[0-9]+\/[0-9]+\/[0-9]+\/[0-9]+)$/.test(path)) {
        enqueueSnackbar('path is invalid', { variant: 'error' });
        return;
      }

      if (currentWallet.walletType === 'keystation') {
        setIsShowLoader(true);
        setIsOpenedSignin(true);

        const myKeystation = new Keystation(process.env.REACT_APP_HOST, currentChain.lcdURL, path);

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
        setIsShowLoader(false);
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
            onClick={() => setIsOpenedPathInfo(true)}
          >
            <HelpOutlineRoundedIcon />
          </IconButton>
        </div>
        <div className={styles.inputContainer}>
          <Input
            value={path}
            onChange={(event) => setPath(event.currentTarget.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                void handleOnClick();
              }
            }}
            sx={{
              width: '20rem',
              '& .MuiOutlinedInput-root': {
                height: '4rem',
                fontSize: '1.4rem',
                color: '#919191',
              },
              '& .MuiOutlinedInput-root:hover': {
                '& > fieldset': {
                  borderColor: 'black',
                },
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
            }}
          />
          <Button sx={{ fontSize: '1.4rem', fontWeight: 'bold' }} onClick={handleOnClick}>
            {t('component.page_section.hd_path.apply_path')}
          </Button>
          <Button sx={{ fontSize: '1.4rem', fontWeight: 'bold' }} onClick={() => setPath(currentChain.wallet.hdPath)}>
            {t('component.page_section.hd_path.init_path')}
          </Button>
        </div>
        {currentWallet.walletType === 'keystation' && (
          <>
            {currentChain.path === CHAIN.KAVA && (
              <div className={styles.alertDescriptionContainer}>
                <div>Ledger Path: 44/118/0/0/0</div>
                <div>Kava Path: 44/459/0/0/0</div>
              </div>
            )}
            {currentChain.path === CHAIN.PERSISTENCE && (
              <div className={styles.alertDescriptionContainer}>
                <div>Ledger Path: 44/118/0/0/0</div>
                <div>Persistence Path: 44/750/0/0/0</div>
              </div>
            )}
            {currentChain.path === CHAIN.FETCH_AI && (
              <div className={styles.alertDescriptionContainer}>
                <div>Ledger Path: 44/118/0/0/0</div>
                <div>Ledger Live Path: 44/60/0/0/0</div>
                <div>Non Ledger Path: 44/60/0/0</div>
              </div>
            )}
          </>
        )}
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
      <DialogPathInfo open={isOpenedPathInfo} onClose={() => setIsOpenedPathInfo(false)} />
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

type DialogPathInfoProps = {
  open: boolean;
  onClose?: () => void;
};

function DialogPathInfo({ open, onClose }: DialogPathInfoProps) {
  const { i18n } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} title="HD derivation path?">
      <div
        style={{
          wordWrap: 'break-word',
          fontSize: '1.4rem',
          whiteSpace: 'pre-wrap',
          padding: '0 2rem 2rem',
          lineHeight: '1.6',
          overflow: 'auto',
        }}
      >
        {i18n.language === 'ko'
          ? `코스모스테이션 웹 지갑은 HD월렛을 지원합니다. HD월렛을 사용하면 하나의 니모닉 시드키로 무한대의 지갑을 사용할 수 있게 됩니다.

"지갑 경로"란, HD월렛 내에 사용하고자 하는 지갑의 정확한 위치를 알려주는 역할을 하는 포인터입니다. 니모닉 시드키는 무한대의 하위 지갑을 생성할 수 있는 마스터 키 입니다—"지갑 경로"는 마스터 키 에서 생성된 무한대의 지갑 목록에서 사용하고자 하는 특정 지갑으로 사용자를 안내하는 역할을 합니다.

코스모스의 "지갑 경로"는 44/118/0/0/0 로 시작합니다. "0"을 원하는 번호로 변경하여 사용하고자 하는 지갑을 액세스 할 수 있습니다.

예를 들어, 코스모스테이션 모바일 지갑에서는 하나의 니모닉 시드키로 최대 5개의 지갑을 사용할 수 있도록 서비스를 제공하고 있습니다. 코스모스테이션 모바일 지갑에선, 이 5개 지갑의 "지갑 경로" 설정을 아래와 같이 해놓았습니다.

44/118/0/0/0
44/118/0/0/1
44/118/0/0/2
44/118/0/0/3
44/118/0/0/4

아래는 사용자가 직접 설정할 수 있는 여러가지 "지갑 경로"의 예 입니다:

44/118/0/0/79
44/118/0/3/56
44/118/0/18/2
44/118/2/0/3
44/118/14/5/4

위의 예시처럼, 코스모스테이션 웹 지갑에서는 하나의 니모닉 시드키로 무한대의 코스모스 지갑을 생성할 수 있습니다.

위의 예시와 같이 커스텀 "지갑 경로"를 사용하는 경우에는, 반드시 본인이 설정한 "지갑 경로"를 잊지 않고 기억해야 합니다—만약 "지갑 경로"를 잊었을 경우에는, 지갑의 정확한 경로를 되찾는데 적게는 몇일이, 많게는 몇달이 걸릴 수 있습니다.

"지갑 경로"를 기본 설정으로 사용하기를 원하신다면, 기본으로 설정되어있는 경로 (44/118/0/0/0)를 변경하지 않고 그대로 사용하시기 바랍니다.`
          : `Cosmostation web wallet supports HD wallets. With an HD wallet, you can access a virtually infinite number of wallets with a single mnemonic phrase.

A "Derivation path" is a pointer that directs you to a specific wallet you wish to access. Think of your mnemonic phrase as a master key that unlocks an infinite number of sub wallets—a "derivation path" directs you to a specific wallet you wish to access from this list of infinite wallets generated from your master mnemonic phrase.

"Derivation paths" for Cosmos begin with 44/118/0/0/0. Replace the "0"s with any number you wish in order to access the wallet you want to use.

For example, in Cosmostation mobile wallet, you can access 5 different wallets with a single mnemonic phrase. In the application, the default "derivation path" settings for these 5 wallets are:

44/118/0/0/0
44/118/0/0/1
44/118/0/0/2
44/118/0/0/3
44/118/0/0/4

Below are examples of "derivation paths" you could use:

44/118/0/0/79
44/118/0/3/56
44/118/0/18/2
44/118/2/0/3
44/118/14/5/4

Like the example above, you can access an infinite number of Cosmos wallets with a single mnemonic phrase.

If you use a custom "derivation path" like the examples above, please take caution and always remember your specific "derivation path"—if you forget your path, it could take days, years, maybe decades to find it again.

If you wish to use the wallet without using a custom "derivation path", leave the default "derivation path" (44/118/0/0/0) unchanged and proceed to access your wallet.`}
      </div>
    </Dialog>
  );
}
