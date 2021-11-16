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
import { getByte, plus, times } from '~/utils/calculator';
import Ledger, { createMsgForLedger, LedgerError } from '~/utils/ledger';
import { createBroadcastBody, createProtoBroadcastBody, createSignature, createSignedTx } from '~/utils/txHelper';

import styles from './index.module.scss';

type DialogWithdrawRewardProps = {
  open: boolean;
  onClose?: () => void;
  validatorAddress: string[];
  amount: string;
  title: string;
  description?: string;
};

export default function DialogWithdrawReward({
  title,
  description,
  amount,
  validatorAddress,
  open,
  onClose,
}: DialogWithdrawRewardProps) {
  const { t } = useTranslation();
  const currentWallet = useCurrentWallet();
  const currentChain = useCurrentChain();
  const createTx = useCreateTx();
  const createProtoTx = useCreateProtoTx();
  const { broadcastTx, broadcastProtoTx } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const [isOpenedTransaction, setIsOpenedTransaction] = useState(false);
  const [transactionInfoData, setTransactionInfoData] = useState<TransactionInfoData & { open: boolean }>({
    step: 'doing',
    title,
    open: false,
  });

  const [memo, setMemo] = useState('');

  const { data, swr } = useChainSWR();

  const { withdrawAddress, account } = data;

  const fee = times(currentChain.fee.withdrawReward, validatorAddress.length);

  const toAddress = withdrawAddress;

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
        (currentChain.path === CHAIN.IRIS && getByte(memo) > 99) ||
        (currentChain.path !== CHAIN.IRIS && getByte(memo) > 255)
      ) {
        throw new Error(`memo is invalid`);
      }

      const txMsgOrigin = createTx.getWithdrawRewardTxMsg(
        validatorAddress.map((address) => ({ validatorAddress: address })),
        memo,
      );

      const gas = plus(currentChain.gas.withdrawReward, times('60000', validatorAddress.length - 1, 0), 0);

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
          to: toAddress,
          amount: `${amount} ${currentChain.symbolName}`,
          fee: `${fee} ${currentChain.symbolName}`,
          memo,
          tx: JSON.stringify(txMsgOrigin, null, 4),
        });
        const ledgerSignature = await ledger.sign(hdPath, Buffer.from(txMsgForSign));

        const secpSignature = secp256k1.signatureImport(ledgerSignature);

        const protoTxBody = createProtoTx.getWithdrawRewardTxBody(
          validatorAddress.map((address) => ({ validatorAddress: address })),
          memo,
        );
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
          to: toAddress,
          amount: `${amount} ${currentChain.symbolName}`,
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
    setMemo('');

    onClose?.();
  };
  return (
    <>
      <Dialog open={open} onClose={handleOnClose} maxWidth="lg">
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            {title && <div className={styles.title}>{title}</div>}
            {description && <div className={styles.description}>{description}</div>}
          </div>

          <div className={styles.rowContainer}>
            <div className={styles.column1}>{t('component.dialog.dialog_withdraw_reward.reward_address')}</div>
            <div className={cx(styles.column2, styles.textEnd)}>{withdrawAddress}</div>
          </div>

          <div className={styles.rowContainer}>
            <div className={styles.column1}>{t('component.dialog.dialog_withdraw_reward.my_reward')}나의 이자</div>
            <div className={cx(styles.column2, styles.textEnd)}>{amount}</div>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.column1}>
              {t('component.dialog.dialog_withdraw_reward.memo')} (
              {t('component.dialog.dialog_withdraw_reward.optional')})
            </div>
            <div className={styles.column2}>
              <Input
                label={t('component.dialog.dialog_withdraw_reward.input_memo')}
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
            <div className={styles.column1}>{t('component.dialog.dialog_withdraw_reward.tx_fee')}</div>
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
