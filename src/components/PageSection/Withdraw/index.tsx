import { useEffect, useState } from 'react';
import cx from 'clsx';
import { useSnackbar } from 'notistack';
import { useSetRecoilState } from 'recoil';
import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';

import Button from '~/components/Button';
import { useChainSWR } from '~/hooks/useChainSWR';
import { useCreateTx } from '~/hooks/useCreateTx';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { loaderState } from '~/stores/loader';
import { divide, gt, minus } from '~/utils/calculator';
import Ledger, { createMsgForLedger, LedgerError } from '~/utils/ledger';

import styles from './index.module.scss';

type WalletInfoProps = {
  className?: string;
};

export default function WalletInfo({ className }: WalletInfoProps) {
  const setLoader = useSetRecoilState(loaderState);
  const { enqueueSnackbar } = useSnackbar();
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();
  const createTx = useCreateTx();

  const [address, setAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [memo, setMemo] = useState('');

  const { isLoading, data, swr } = useChainSWR();

  useEffect(() => {
    setLoader(true);

    if (isLoading) {
      setLoader(false);
    }
  }, [isLoading, setLoader]);

  const { availableAmount, account } = data;

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.rowContainer}>
        <div className={styles.column1}>사용 가능 수량</div>
        <div className={cx(styles.column2, styles.textEnd)}>
          {availableAmount} {currentChain.symbolName}
        </div>
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.column1}>받을 지갑 주소</div>
        <div className={styles.column2}>
          <Input label="지갑 주소 입력" value={address} onChange={(event) => setAddress(event.currentTarget.value)} />
        </div>
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.column1}>전송 수량</div>
        <div className={styles.column2}>
          <Input
            label="전송 수량 입력"
            sx={{ width: 'calc(100% - 14.8rem)', fontSize: '1.4rem' }}
            value={sendAmount}
            onChange={(event) => setSendAmount(event.currentTarget.value)}
          />
          <Button
            sx={{ fontSize: '1.4rem', width: '7rem', marginLeft: '0.4rem' }}
            onClick={() => setSendAmount(divide(availableAmount, '2', currentChain.decimal))}
          >
            1/2
          </Button>
          <Button
            sx={{ fontSize: '1.4rem', width: '7rem', marginLeft: '0.4rem' }}
            onClick={() => setSendAmount(minus(availableAmount, currentChain.fee.withdraw, currentChain.decimal))}
          >
            MAX
          </Button>
        </div>
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.column1}>메모 (선택 사항)</div>
        <div className={styles.column2}>
          <Input
            label="메모 내용 입력"
            multiline
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                minHeight: '6rem',
              },
            }}
            value={memo}
            onChange={(event) => setMemo(event.currentTarget.value)}
          />
        </div>
      </div>
      <div className={styles.rowContainer}>
        <div className={styles.column1}>수수료</div>
        <div className={cx(styles.column2, styles.textEnd)}>
          {currentChain.fee.withdraw} {currentChain.symbolName}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}
          colorVariant="black"
          onClick={async () => {
            try {
              await swr.account.mutate();

              if (!account) {
                throw new Error('account not found');
              }

              if (!currentWallet.HDPath) {
                throw new Error(`Path is invalid`);
              }

              if (
                !address.startsWith(currentChain.wallet.prefix) ||
                currentWallet.address === address ||
                currentWallet.address?.length !== address.length
              ) {
                throw new Error(`Address is invalid`);
              }

              if (gt(sendAmount, minus(availableAmount, currentChain.fee.withdraw, currentChain.decimal))) {
                throw new Error(`sendAmount is invalid`);
              }

              const ledger = await Ledger();

              const tx = createTx.getSendTxMsg(address, sendAmount);

              const hdPath = currentWallet.HDPath.split('/').map((item) => Number(item));

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const signature = await ledger.sign(
                hdPath,
                createMsgForLedger({
                  message: tx,
                  accountNumber: account.account_number,
                  chainId: currentChain.chainId,
                  sequence: account.sequence,
                }),
              );
            } catch (e) {
              if (e instanceof LedgerError) {
                enqueueSnackbar('check the ledger connection', { variant: 'error' });
              } else enqueueSnackbar((e as { message: string }).message, { variant: 'error' });
            }
          }}
        >
          Generate & Sign Transaction
        </Button>
      </div>
    </div>
  );
}

function Input(props: TextFieldProps) {
  const { sx, ...etc } = props;
  return (
    <TextField
      variant="outlined"
      size="small"
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          height: '4rem',
          fontSize: '1.4rem',
        },
        '& .MuiInputLabel-root': {
          fontSize: '1.4rem',

          '&.Mui-focused': {
            color: 'black',
          },
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
      {...etc}
    />
  );
}
