import cx from 'clsx';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Button } from '@mui/material';

import styles from './index.module.scss';

type HeaderProps = {
  className?: string;
};

export default function Header({ className }: HeaderProps) {
  return (
    <div className={cx(styles.container, className)}>
      <>
        <div className={styles.left} />
        <div className={styles.right}>
          <div>
            <Button variant="text" startIcon={<AccountCircleOutlinedIcon />} className={styles.accountButton}>
              Connect Wallet
            </Button>
          </div>
        </div>
      </>
    </div>
  );
}
