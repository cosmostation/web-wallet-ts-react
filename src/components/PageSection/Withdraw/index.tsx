import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'clsx';
import { useSnackbar } from 'notistack';
import { useSetRecoilState } from 'recoil';
import secp256k1 from 'secp256k1';

import Button from '~/components/Button';
import type { TransactionInfoData } from '~/components/Dialog/DialogTransactionInfo';
import DialogTransactionInfo from '~/components/Dialog/DialogTransactionInfo';
import Input from '~/components/Input';
import Transaction from '~/components/Keystation/Transaction';
import { CHAIN } from '~/constants/chain';
import { useAxios } from '~/hooks/useAxios';
import { useChainSWR } from '~/hooks/useChainSWR';
import { useCreateTx } from '~/hooks/useCreateTx';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { loaderState } from '~/stores/loader';
import { divide, equal, getByte, gt, minus } from '~/utils/calculator';
import Ledger, { createMsgForLedger, LedgerError } from '~/utils/ledger';
import { createBroadcastBody, createSignature, createSignedTx } from '~/utils/txHelper';
import { isDecimal } from '~/utils/validator';

import styles from './index.module.scss';

type WalletInfoProps = {
  className?: string;
};

export default function WalletInfo({ className }: WalletInfoProps) {
  const { t } = useTranslation();
  const title = t('component.page_section.withdraw.send');

  const [transactionInfoData, setTransactionInfoData] = useState<TransactionInfoData & { open: boolean }>({
    step: 'doing',
    title,
    open: false,
  });

  const [isOpenedTransaction, setIsOpenedTransaction] = useState(false);
  const setLoader = useSetRecoilState(loaderState);
  const { enqueueSnackbar } = useSnackbar();
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const createTx = useCreateTx();

  const { boardcastTx } = useAxios();

  const [address, setAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [memo, setMemo] = useState('');

  const { data, swr } = useChainSWR();

  const { availableAmount, account } = data;

  const handleOnSuccess = () => {
    setAddress('');
    setSendAmount('');
    setMemo('');

    setTimeout(() => {
      void swr.balance.mutate();
      void swr.account.mutate();
    }, 7000);
  };

  const handleOnClick = async () => {
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

      if (
        !sendAmount ||
        equal(sendAmount, '0') ||
        gt(sendAmount, minus(availableAmount, currentChain.fee.withdraw, currentChain.decimal))
      ) {
        throw new Error(`sendAmount is invalid`);
      }

      if (
        (currentChain.path === CHAIN.IRIS && getByte(memo) > 99) ||
        (currentChain.path !== CHAIN.IRIS && getByte(memo) > 255)
      ) {
        throw new Error(`memo is invalid`);
      }

      const txMsgOrigin = createTx.getSendTxMsg(address, sendAmount, memo);

      const txMsgForSign = createMsgForLedger({
        message: txMsgOrigin,
        accountNumber: account.account_number,
        chainId: currentChain.chainId,
        sequence: account.sequence,
      });

      if (currentWallet.walletType === 'ledger') {
        const ledger = await Ledger();

        const hdPath = currentWallet.HDPath.split('/').map((item) => Number(item));

        const publicKey = await ledger.getPublicKey(hdPath);

        setTransactionInfoData({
          open: true,
          step: 'doing',
          title,
          from: currentWallet.address,
          to: address,
          amount: `${sendAmount} ${currentChain.symbolName}`,
          fee: `${currentChain.fee.withdraw} ${currentChain.symbolName}`,
          memo,
          tx: JSON.stringify(txMsgOrigin, null, 4),
        });
        const ledgerSignature = await ledger.sign(hdPath, Buffer.from(txMsgForSign));

        const secpSignature = secp256k1.signatureImport(ledgerSignature);

        const signature = createSignature({
          publicKey,
          signature: secpSignature,
          accountNumber: account.account_number,
          sequence: account.sequence,
        });

        const tx = createSignedTx(txMsgOrigin, signature);
        const txBody = createBroadcastBody(tx);

        const result = await boardcastTx(txBody);

        setTransactionInfoData((prev) => ({ ...prev, step: 'success', open: true, txHash: result.txhash }));

        handleOnSuccess();
      }

      if (currentWallet.walletType === 'keystation') {
        setIsOpenedTransaction(true);

        const myKeystation = new Keystation(process.env.REACT_APP_HOST, currentChain.lcdURL, currentWallet.HDPath);

        const popup = myKeystation.openWindow('transaction', txMsgForSign, currentWallet.keystationAccount!);

        setTransactionInfoData({
          open: true,
          step: 'doing',
          title,
          from: currentWallet.address,
          to: address,
          amount: `${sendAmount} ${currentChain.symbolName}`,
          fee: `${currentChain.fee.withdraw} ${currentChain.symbolName}`,
          memo,
          tx: JSON.stringify(txMsgOrigin, null, 4),
        });

        const timer = setInterval(() => {
          if (popup.closed) {
            setTransactionInfoData((prev) => {
              if (prev.step === 'success' && prev.open) {
                return prev;
              }

              return { ...prev, open: false };
            });
            setIsOpenedTransaction(false);
            setLoader(false);
            clearInterval(timer);
          }
        }, 500);
      }
    } catch (e) {
      if (e instanceof LedgerError) {
        enqueueSnackbar((e as { message: string }).message, { variant: 'error' });
        setTransactionInfoData((prev) => ({ ...prev, open: false }));
      } else enqueueSnackbar((e as { message: string }).message, { variant: 'error' });

      setTransactionInfoData(() => ({ step: 'doing', open: false, title }));
    }
  };

  useEffect(() => {
    setAddress('');
    setSendAmount('');
    setMemo('');
  }, [currentChain]);

  return (
    <div className={className}>
      <div className={styles.title}>{t('component.page_section.withdraw.noun_send')}</div>

      <div className={styles.contentContainer}>
        <div className={styles.rowContainer}>
          <div className={styles.column1}>{t('component.page_section.withdraw.available_amount')}</div>
          <div className={cx(styles.column2, styles.textEnd)}>
            {availableAmount} {currentChain.symbolName}
          </div>
        </div>
        <div className={styles.rowContainer}>
          <div className={styles.column1}>{t('component.page_section.withdraw.to_address')}</div>
          <div className={styles.column2}>
            <Input
              label={t('component.page_section.withdraw.input_address')}
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value)}
            />
          </div>
        </div>
        <div className={styles.rowContainer}>
          <div className={styles.column1}>{t('component.page_section.withdraw.send_amount')}</div>
          <div className={styles.column2}>
            <Input
              label={t('component.page_section.withdraw.input_amount')}
              sx={{ width: 'calc(100% - 14.8rem)', fontSize: '1.4rem' }}
              value={sendAmount}
              onChange={(event) => {
                if (!isDecimal(event.currentTarget.value, currentChain.decimal) && event.currentTarget.value) {
                  return;
                }

                setSendAmount(event.currentTarget.value);
              }}
            />
            <Button
              sx={{ fontSize: '1.4rem', width: '7rem', marginLeft: '0.4rem' }}
              onClick={() => setSendAmount(divide(availableAmount, '2', currentChain.decimal))}
            >
              1/2
            </Button>
            <Button
              sx={{ fontSize: '1.4rem', width: '7rem', marginLeft: '0.4rem' }}
              onClick={() => {
                const maxAmount = minus(availableAmount, currentChain.fee.withdraw, currentChain.decimal);

                setSendAmount(gt(maxAmount, '0') ? maxAmount : '0');
              }}
            >
              MAX
            </Button>
          </div>
        </div>
        <div className={styles.rowContainer}>
          <div className={styles.column1}>
            {t('component.page_section.withdraw.memo')} ({t('component.page_section.withdraw.optional')})
          </div>
          <div className={styles.column2}>
            <Input
              label={t('component.page_section.withdraw.input_memo')}
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
          <div className={styles.column1}>{t('component.page_section.withdraw.tx_fee')}</div>
          <div className={cx(styles.column2, styles.textEnd)}>
            {currentChain.fee.withdraw} {currentChain.symbolName}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button sx={{ fontSize: '1.4rem', fontWeight: 'bold' }} colorVariant="black" onClick={handleOnClick}>
            Generate & Sign Transaction
          </Button>
        </div>
      </div>
      {isOpenedTransaction && (
        <Transaction
          onSuccess={(e) => {
            setTransactionInfoData((prev) => ({ ...prev, step: 'success', open: true, txHash: e.data.txhash }));

            handleOnSuccess();
          }}
        />
      )}
      <DialogTransactionInfo
        open={transactionInfoData.open}
        data={transactionInfoData}
        onClose={
          transactionInfoData.step === 'success'
            ? () => setTransactionInfoData((prev) => ({ ...prev, open: false }))
            : undefined
        }
      />
    </div>
  );
}
