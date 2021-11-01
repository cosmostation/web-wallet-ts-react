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

type TransactionInfoProps = {
  open: boolean;
  data: TransactionInfoData;
  onClose?: () => void;
};

export default function TransactionInfo({ open, onClose, data }: TransactionInfoProps) {
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
                    ? '레저 기기에서 서명하세요.'
                    : '키스테이션에서 Allow 버튼을 누르고 PIN을 입력하여 서명하세요.'}
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
                    <div>수량</div>
                    <div>{data.amount}</div>
                  </div>
                )}

                {data.fee && (
                  <div className={styles.itemContainer}>
                    <div>tx 수수료</div>
                    <div>{data.fee}</div>
                  </div>
                )}

                {data.memo && (
                  <div className={styles.memoContainer}>
                    <div>메모</div>
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
                요청이 완료되었습니다.
              </div>
              <div className={styles.listContainer}>
                {data.amount && (
                  <div className={styles.itemContainer}>
                    <div>수량</div>
                    <div>{data.amount}</div>
                  </div>
                )}

                {data.fee && (
                  <div className={styles.itemContainer}>
                    <div>tx 수수료</div>
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
                    익스플로러에서 상세 확인
                  </a>
                </div>
                <div className={styles.linkDescription}>상세 트랜잭션 확인까지 3~10초 가량 소요됩니다.</div>
              </div>
              <div className={styles.buttonContainer}>
                <Button sx={{ fontSize: '1.4rem', fontWeight: 'bold' }} colorVariant="black" onClick={onClose}>
                  확인
                </Button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
