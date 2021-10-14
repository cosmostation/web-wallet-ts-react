import { useState } from 'react';
import cx from 'clsx';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';

import DialogChainSelect from '~/components/Dialog/DialogChainSelect';
import DialogWalletConnect from '~/components/Dialog/DialogWalletConnect';
import { getSymbolURL } from '~/utils/urls';

import styles from './index.module.scss';

type HeaderProps = {
  className?: string;
  backgroundColor?: 'black' | 'transparent';
};

export default function Header({ className, backgroundColor }: HeaderProps) {
  const [isOpenedSelect, setIsOpenedSelect] = useState(false);
  const [isOpenedConnect, setIsOpenedConnect] = useState(false);

  return (
    <>
      <div className={cx(styles.container, styles[backgroundColor ?? 'black'], className)}>
        <div className={styles.left} />
        <div className={styles.right}>
          <button type="button" className={styles.chainButton} onClick={() => setIsOpenedSelect(true)}>
            <div className={styles.chainButtonLeft}>
              <div className={styles.chainImgContainer}>
                <img src={getSymbolURL('akash')} alt="akash" />
              </div>
              <div className={styles.accountButtonText}>akash</div>
            </div>
            <WidgetsIcon />
          </button>
          <button type="button" className={styles.accountButton} onClick={() => setIsOpenedConnect(true)}>
            <AccountCircleOutlinedIcon />
            <div className={styles.accountButtonText}>Connect Wallet</div>
          </button>
        </div>
      </div>
      <DialogChainSelect open={isOpenedSelect} onClose={() => setIsOpenedSelect(false)} />
      <DialogWalletConnect open={isOpenedConnect} onClose={() => setIsOpenedConnect(false)} />
    </>
  );
}
