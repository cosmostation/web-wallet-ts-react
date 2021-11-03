import { useTranslation } from 'react-i18next';
import cx from 'clsx';
import CheckIcon from '@mui/icons-material/Check';

import Button from '~/components/Button';
import Dialog from '~/components/Dialog';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';

import styles from './index.module.scss';

export type TransactionInfoData = {
  step: 'doing' | 'success';
  title: string;
  from?: string;
  to?: string;
  amount?: string;
  fee?: string;
  memo?: string;
  tx?: string;
  txHash?: string;
};

type DialogTransactionInfoProps = {
  open: boolean;
  data: TransactionInfoData;
  onClose?: () => void;
};

export default function DialogTransactionInfo({ open, onClose, data }: DialogTransactionInfoProps) {
  const { t } = useTranslation();
  const currentWallet = useCurrentWallet();
  const currentChain = useCurrentChain();

  const isLedger = currentWallet.walletType === 'ledger';
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <div className={styles.container}>
          <div className={styles.title}>{data.title}</div>
          {data.step === 'doing' && (
            <>
              <div className={styles.descContainer}>
                <div className={styles.imgContainer}>
                  <img src={`/images/transaction/${isLedger ? 'ledger.gif' : 'keystation.png'}`} alt="" />
                </div>
                <div className={styles.description}>
                  {isLedger
                    ? t('component.dialog.dialog_transaction_info.ledger_description')
                    : t('component.dialog.dialog_transaction_info.keystation_description')}
                </div>
              </div>
              <div className={styles.listContainer}>
                {data.from && (
                  <div className={styles.itemContainer}>
                    <div>from</div>
                    <div>{data.from}</div>
                  </div>
                )}
                {data.to && (
                  <div className={styles.itemContainer}>
                    <div>to</div>
                    <div>{data.to}</div>
                  </div>
                )}
                {data.amount && (
                  <div className={styles.itemContainer}>
                    <div>{t('component.dialog.dialog_transaction_info.amount')}</div>
                    <div>{data.amount}</div>
                  </div>
                )}

                {data.fee && (
                  <div className={styles.itemContainer}>
                    <div>{t('component.dialog.dialog_transaction_info.tx_fee')}</div>
                    <div>{data.fee}</div>
                  </div>
                )}

                {data.memo && (
                  <div className={styles.memoContainer}>
                    <div>{t('component.dialog.dialog_transaction_info.memo')}</div>
                    <div className={styles.memoContent}>{data.memo}</div>
                  </div>
                )}

                {data.tx && (
                  <div className={styles.txContainer}>
                    <div>View raw transaction</div>
                    <div className={styles.txContent}>{data.tx}</div>
                  </div>
                )}
              </div>
            </>
          )}
          {data.step === 'success' && (
            <>
              <div className={styles.successDesc}>
                <CheckIcon sx={{ color: '#15cb6b', width: '3rem', height: '3rem' }} />
                {t('component.dialog.dialog_transaction_info.send_tx_successfully')}
              </div>
              <div className={styles.listContainer}>
                {data.amount && (
                  <div className={styles.itemContainer}>
                    <div>{t('component.dialog.dialog_transaction_info.amount')}</div>
                    <div>{data.amount}</div>
                  </div>
                )}

                {data.fee && (
                  <div className={styles.itemContainer}>
                    <div>{t('component.dialog.dialog_transaction_info.tx_fee')}</div>
                    <div>{data.fee}</div>
                  </div>
                )}

                {data.txHash && (
                  <div className={cx(styles.itemContainer, styles.fontSize11)}>
                    <div>Transaction Hash</div>
                    <div>{data.txHash}</div>
                  </div>
                )}
              </div>
              <div className={styles.detailLinkContainer}>
                <div>
                  <a
                    href={`https://www.mintscan.io/${currentChain.mintscanPath}/txs/${data?.txHash || ''}`}
                    className={styles.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('component.dialog.dialog_transaction_info.view_transaction')}
                  </a>
                </div>
                <div className={styles.linkDescription}>
                  {t('component.dialog.dialog_transaction_info.view_transaction_description')}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <Button sx={{ fontSize: '1.4rem', fontWeight: 'bold' }} colorVariant="black" onClick={onClose}>
                  {t('component.dialog.dialog_transaction_info.confirm')}
                </Button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
