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
import { useGaEvent } from '~/hooks/useGaEvent';
import { getByte } from '~/utils/calculator';
import Ledger, { createMsgForLedger, LedgerError } from '~/utils/ledger';
import { createBroadcastBody, createProtoBroadcastBody, createSignature, createSignedTx } from '~/utils/txHelper';

import styles from './index.module.scss';

type DialogModifyWithdrawAddressProps = {
  open: boolean;
  onClose?: () => void;
};

export default function DialogModifyWithdrawAddress({ open, onClose }: DialogModifyWithdrawAddressProps) {
  const { t } = useTranslation();
  const currentWallet = useCurrentWallet();
  const currentChain = useCurrentChain();
  const createTx = useCreateTx();
  const createProtoTx = useCreateProtoTx();
  const gaEvent = useGaEvent();

  const { broadcastTx, broadcastProtoTx } = useAxios();
  const { enqueueSnackbar } = useSnackbar();

  const title = t('component.dialog.dialog_modify_withdraw_address.modify_withdraw_address');

  const [isOpenedTransaction, setIsOpenedTransaction] = useState(false);
  const [transactionInfoData, setTransactionInfoData] = useState<TransactionInfoData & { open: boolean }>({
    step: 'doing',
    title,
    open: false,
  });

  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');

  const { data, swr } = useChainSWR();

  const { withdrawAddress, account } = data;

  const fee = currentChain.fee.modifyWithdrawAddress;
  const gas = currentChain.gas.modifyWithdrawAddress;

  const fromAddress = withdrawAddress;

  const afterSuccess = () => {
    setTimeout(() => {
      void swr.account.mutate();
      void swr.balance.mutate();
      void swr.withdrawAddress.mutate();
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
        !address ||
        withdrawAddress === address ||
        !address.startsWith(currentChain.wallet.prefix) ||
        withdrawAddress.length !== address.length
      ) {
        throw new Error(`address is invalid`);
      }

      if (
        (currentChain.path === CHAIN.IRIS && getByte(memo) > 99) ||
        (currentChain.path !== CHAIN.IRIS && getByte(memo) > 255)
      ) {
        throw new Error(`memo is invalid`);
      }

      const txMsgOrigin = createTx.getModifyWithdrawAddressTxMsg(address, memo);

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
          from: fromAddress,
          to: address,
          fee: `${fee} ${currentChain.symbolName}`,
          memo,
          tx: JSON.stringify(txMsgOrigin, null, 4),
        });
        const ledgerSignature = await ledger.sign(hdPath, Buffer.from(txMsgForSign));

        const secpSignature = secp256k1.signatureImport(ledgerSignature);

        const protoTxBody = createProtoTx.getModifyWithdrawAddressTxBody(address, memo);
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

        gaEvent('ModifyWithdrawAddress', 'ledger');

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
          from: fromAddress,
          to: address,
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
    setAddress('');

    onClose?.();
  };
  return (
    <>
      <Dialog open={open} onClose={handleOnClose} maxWidth="lg">
        <div className={styles.container}>
          <div className={styles.title}>{title}</div>

          <div className={styles.rowContainer}>
            <div className={styles.column1}>
              {t('component.dialog.dialog_modify_withdraw_address.current_withdraw_address')}
            </div>
            <div className={cx(styles.column2, styles.textEnd)}>{withdrawAddress}</div>
          </div>

          <div className={styles.rowContainer}>
            <div className={styles.column1}>
              {t('component.dialog.dialog_modify_withdraw_address.withdraw_address_to_modify')}
            </div>
            <div className={styles.column2}>
              <Input
                label={t('component.dialog.dialog_modify_withdraw_address.input_address')}
                value={address}
                onChange={(event) => setAddress(event.currentTarget.value)}
              />
            </div>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.column1}>
              {t('component.dialog.dialog_modify_withdraw_address.memo')} (
              {t('component.dialog.dialog_modify_withdraw_address.optional')})
            </div>
            <div className={styles.column2}>
              <Input
                label={t('component.dialog.dialog_modify_withdraw_address.input_memo')}
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
            <div className={styles.column1}>{t('component.dialog.dialog_modify_withdraw_address.tx_fee')}</div>
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
                gaEvent('ModifyWithdrawAddress', 'keystation');

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
