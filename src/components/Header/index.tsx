import { useState } from 'react';
import cx from 'clsx';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { AppBar, IconButton } from '@mui/material';

import DialogChainSelect from '~/components/Dialog/DialogChainSelect';
import DialogWalletConnect from '~/components/Dialog/DialogWalletConnect';
import Drawer from '~/components/Drawer';
import { DRAWER_WIDTH } from '~/constants/common';
import { getSymbolURL } from '~/utils/urls';

import styles from './index.module.scss';

type HeaderProps = {
  className?: string;
  backgroundColor?: 'black' | 'transparent';
};

export default function Header({ className, backgroundColor }: HeaderProps) {
  const [isOpenedSelect, setIsOpenedSelect] = useState(false);
  const [isOpenedConnect, setIsOpenedConnect] = useState(false);
  const [isOpenedDrawer, setIsOpenedDrawer] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${DRAWER_WIDTH})` },
          ml: { lg: DRAWER_WIDTH },
          backgroundColor: 'transparent',
        }}
      >
        <div className={cx(styles.container, styles[backgroundColor ?? 'black'], className)}>
          <div className={styles.left}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setIsOpenedDrawer(true)}
              sx={{ display: { lg: 'none' } }}
              size="large"
            >
              <MenuIcon sx={{ width: '2.4rem', height: '2.4rem' }} />
            </IconButton>
          </div>
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
      </AppBar>
      <DialogChainSelect open={isOpenedSelect} onClose={() => setIsOpenedSelect(false)} />
      <DialogWalletConnect open={isOpenedConnect} onClose={() => setIsOpenedConnect(false)} />
      <Drawer open={isOpenedDrawer} onClose={() => setIsOpenedDrawer(false)} />
    </>
  );
}
