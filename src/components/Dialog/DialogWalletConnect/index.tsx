import cx from 'clsx';

import Dialog from '~/components/Dialog';

import styles from './index.module.scss';

type DialogWalletConnectProps = {
  open: boolean;
  onClose?: () => void;
};

export default function DialogWalletConnect({ open, onClose }: DialogWalletConnectProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <div className={styles.container}>
        <div className={styles.connectContainer}>
          <ConnectButton name="Connect To Ledger" imgURL="/images/signIn/ledger.png" disabled />
          <div className={styles.verticalDivider} />
          <ConnectButton name="Connect To Keystation" imgURL="/images/signIn/keystation.png" />
        </div>
        <div>지갑 설치 및 사용법</div>
        <div>추후 지원 예정</div>
      </div>
    </Dialog>
  );
}

type ConnectButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  name: string;
  imgURL: string;
};

function ConnectButton({ className, name, imgURL, disabled, onClick }: ConnectButtonProps) {
  return (
    <div className={cx(styles.buttonContainer, className)}>
      <button type="button" className={styles.button} onClick={onClick} disabled={disabled}>
        <div className={styles.imgContainer}>
          <img src={imgURL} alt={name} />
        </div>
        <div className={styles.text}>{name}</div>
      </button>
    </div>
  );
}
