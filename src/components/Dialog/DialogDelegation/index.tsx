import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'clsx';
import { useSnackbar } from 'notistack';
import secp256k1 from 'secp256k1';

import Button from '~/components/Button';
import Dialog from '~/components/Dialog';
import type { TransactionInfoData } from '~/components/Dialog/DialogTransactionInfo';
import TransactionInfo from '~/components/Dialog/DialogTransactionInfo';
import Input from '~/components/Input';
import Transaction from '~/components/Keystation/Transaction';
import { CHAIN } from '~/constants/chain';
import { useAxios } from '~/hooks/useAxios';
import { useChainSWR } from '~/hooks/useChainSWR';
import { useCreateProtoTx } from '~/hooks/useCreateProtoTx';
import { useCreateTx } from '~/hooks/useCreateTx';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { divide, equal, getByte, gt, minus, pow, times } from '~/utils/calculator';
import Ledger, { createMsgForLedger, LedgerError } from '~/utils/ledger';
import { createBroadcastBody, createProtoBroadcastBody, createSignature, createSignedTx } from '~/utils/txHelper';
import { isDecimal } from '~/utils/validator';

import styles from './index.module.scss';

export type InputData =
  | {
      type: 'delegate' | 'undelegate';
      validatorAddress: string;
    }
  | {
      type: 'redelegate';
      validatorSrcAddress: string;
      validatorDstAddress: string;
    };

type DialogDelegationProps = {
  open: boolean;
  onClose?: () => void;
  inputData: InputData;
};

export default function DialogDelegation({ inputData, open, onClose }: DialogDelegationProps) {
  const { t } = useTranslation();
  const currentWallet = useCurrentWallet();
  const currentChain = useCurrentChain();
  const createTx = useCreateTx();
  const createProtoTx = useCreateProtoTx();

  const { broadcastTx, broadcastProtoTx } = useAxios();

  const { enqueueSnackbar } = useSnackbar();

  const title = (() => {
    if (inputData.type === 'redelegate') return t('component.dialog.dialog_delegation.redelegate');
    if (inputData.type === 'undelegate') return t('component.dialog.dialog_delegation.undelegate');
    return t('component.dialog.dialog_delegation.delegate');
  })();

  const [isOpenedTransaction, setIsOpenedTransaction] = useState(false);
  const [transactionInfoData, setTransactionInfoData] = useState<TransactionInfoData & { open: boolean }>({
    step: 'doing',
    title,
    open: false,
  });

  const [sendAmount, setSendAmount] = useState('');
  const [memo, setMemo] = useState('');

  const { data, swr } = useChainSWR();

  const { availableAmount, account } = data;

  const amount = (() => {
    if (inputData.type === 'redelegate') {
      return times(
        swr.delegations?.data?.find((item) => item.delegation.validator_address === inputData.validatorSrcAddress)
          ?.balance?.amount || '0',
        pow(10, -currentChain.decimal),
        currentChain.decimal,
      );
    }

    if (inputData.type === 'undelegate') {
      return times(
        swr.delegations?.data?.find((item) => item.delegation.validator_address === inputData.validatorAddress)?.balance
          ?.amount || '0',
        pow(10, -currentChain.decimal),
        currentChain.decimal,
      );
    }

    return availableAmount;
  })();

  const fee = (() => {
    if (inputData.type === 'redelegate') return currentChain.fee.redelegate;
    if (inputData.type === 'undelegate') return currentChain.fee.undelegate;
    return currentChain.fee.delegate;
  })();

  const gas = (() => {
    if (inputData.type === 'redelegate') return currentChain.gas.redelegate;
    if (inputData.type === 'undelegate') return currentChain.gas.undelegate;
    return currentChain.gas.delegate;
  })();

  const toAddress = (() => {
    if (inputData.type === 'redelegate') return inputData.validatorDstAddress;
    return inputData.validatorAddress;
  })();

  const afterSuccess = () => {
    setTimeout(() => {
      void swr.delegations.mutate();
      void swr.balance.mutate();
      void swr.unbondingDelegation.mutate();
      void swr.rewards.mutate();
      void swr.account.mutate();
    }, 15000);
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
        !currentWallet.address ||
        ((inputData.type === 'delegate' || inputData.type === 'undelegate') && !inputData.validatorAddress) ||
        (inputData.type === 'redelegate' && (!inputData.validatorDstAddress || !inputData.validatorSrcAddress))
      ) {
        throw new Error(`Address is invalid`);
      }

      if (
        !sendAmount ||
        equal(sendAmount, '0') ||
        gt(sendAmount, minus(amount, inputData.type === 'delegate' ? fee : '0', currentChain.decimal))
      ) {
        throw new Error('Amount is invalid');
      }

      if (
        (currentChain.path === CHAIN.IRIS && getByte(memo) > 99) ||
        (currentChain.path !== CHAIN.IRIS && getByte(memo) > 255)
      ) {
        throw new Error(`memo is invalid`);
      }

      const txMsgOrigin = (() => {
        if (inputData.type === 'redelegate')
          return createTx.getRedelegateTxMsg(
            inputData.validatorSrcAddress,
            inputData.validatorDstAddress,
            sendAmount,
            memo,
          );

        if (inputData.type === 'undelegate') {
          return createTx.getUndelegateTxMsg(inputData.validatorAddress, sendAmount, memo);
        }

        return createTx.getDelegateTxMsg(inputData.validatorAddress, sendAmount, memo);
      })();

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
          to: toAddress,
          amount: `${sendAmount} ${currentChain.symbolName}`,
          fee: `${fee} ${currentChain.symbolName}`,
          memo,
          tx: JSON.stringify(txMsgOrigin, null, 4),
        });
        const ledgerSignature = await ledger.sign(hdPath, Buffer.from(txMsgForSign));

        const secpSignature = secp256k1.signatureImport(ledgerSignature);

        const protoTxBody = (() => {
          if (inputData.type === 'redelegate')
            return createProtoTx.getRedelegateTxBody(
              inputData.validatorSrcAddress,
              inputData.validatorDstAddress,
              sendAmount,
              memo,
            );

          if (inputData.type === 'undelegate') {
            return createProtoTx.getUndelegateTxBody(inputData.validatorAddress, sendAmount, memo);
          }

          return createProtoTx.getDelegateTxBody(inputData.validatorAddress, sendAmount, memo);
        })();

        const protoAuthInfo = createProtoTx.getAuthInfo(fee, gas, publicKey, account.sequence);
        const protoTxRaw = createProtoTx.getTxRaw(protoTxBody, protoAuthInfo, secpSignature);
        const txBytes = createProtoBroadcastBody(protoTxRaw);

        const signature = createSignature({
          publicKey,
          signature: secpSignature,
          accountNumber: account.account_number,
          sequence: account.sequence,
        });

        const tx = createSignedTx(txMsgOrigin, signature);
        const txBody = createBroadcastBody(tx);

        const result = (currentChain.wallet.isProto ? await broadcastProtoTx(txBytes) : await broadcastTx(txBody)) as {
          // eslint-disable-next-line camelcase
          tx_response: { txhash: string };
          txhash: string;
        };

        const txHash = result?.tx_response ? result?.tx_response.txhash : result.txhash;

        setTransactionInfoData((prev) => ({ ...prev, step: 'success', open: true, txHash }));

        afterSuccess();
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
          to: toAddress,
          amount: `${sendAmount} ${currentChain.symbolName}`,
          fee: `${fee} ${currentChain.symbolName}`,
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

  const handleOnClose = () => {
    setSendAmount('');
    setMemo('');

    onClose?.();
  };
  return (
    <>
      <Dialog open={open} onClose={handleOnClose} maxWidth="lg">
        <div className={styles.container}>
          <div className={styles.title}>{title}</div>

          <div className={styles.rowContainer}>
            <div className={styles.column1}>{t('component.dialog.dialog_delegation.available_amount')}</div>
            <div className={cx(styles.column2, styles.textEnd)}>
              {amount} {currentChain.symbolName}
            </div>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.column1}>{t('component.dialog.dialog_delegation.amount')}</div>
            <div className={styles.column2}>
              <Input
                label={t('component.dialog.dialog_delegation.input_amount')}
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
                onClick={() => setSendAmount(divide(amount, '2', currentChain.decimal))}
              >
                1/2
              </Button>
              <Button
                sx={{ fontSize: '1.4rem', width: '7rem', marginLeft: '0.4rem' }}
                onClick={() => {
                  const maxAmount = minus(
                    amount,
                    inputData.type === 'delegate' ? currentChain.fee.delegate : '0',
                    currentChain.decimal,
                  );

                  setSendAmount(gt(maxAmount, '0') ? maxAmount : '0');
                }}
              >
                MAX
              </Button>
            </div>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.column1}>
              {t('component.dialog.dialog_delegation.memo')} ({t('component.dialog.dialog_delegation.optional')})
            </div>
            <div className={styles.column2}>
              <Input
                label={t('component.dialog.dialog_delegation.input_memo')}
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
            <div className={styles.column1}>{t('component.dialog.dialog_delegation.tx_fee')}</div>
            <div className={cx(styles.column2, styles.textEnd)}>
              {fee} {currentChain.symbolName}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button sx={{ fontSize: '1.4rem', fontWeight: 'bold' }} colorVariant="black" onClick={handleOnClick}>
              Generate & Sign Transaction
            </Button>
          </div>
          {isOpenedTransaction && (
            <Transaction
              onSuccess={(e) => {
                setTransactionInfoData((prev) => ({ ...prev, step: 'success', open: true, txHash: e.data.txhash }));

                afterSuccess();
              }}
            />
          )}
          <TransactionInfo
            open={transactionInfoData.open}
            data={transactionInfoData}
            onClose={
              transactionInfoData.step === 'success'
                ? () => {
                    setTransactionInfoData((prev) => ({ ...prev, open: false }));
                    handleOnClose();
                  }
                : undefined
            }
          />
        </div>
      </Dialog>
    </>
  );
}
