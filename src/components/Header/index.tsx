import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'clsx';
import { useSetRecoilState } from 'recoil';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { AppBar, Button, IconButton, Popover } from '@mui/material';

import DialogChainSelect from '~/components/Dialog/DialogChainSelect';
import DialogWalletConnect from '~/components/Dialog/DialogWalletConnect';
import Drawer from '~/components/Drawer';
import { chains } from '~/constants/chain';
import { DRAWER_WIDTH } from '~/constants/common';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentPath } from '~/hooks/useCurrentPath';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { keystationRequestTypeState, walletInfoState } from '~/stores/wallet';

import styles from './index.module.scss';

type HeaderProps = {
  className?: string;
  backgroundColor?: 'black' | 'transparent';
};

export default function Header({ className, backgroundColor }: HeaderProps) {
  const [isOpenedConnect, setIsOpenedConnect] = useState(false);
  const [isOpenedSelect, setIsOpenedSelect] = useState(false);
  const [isOpenedDrawer, setIsOpenedDrawer] = useState(false);

  const setWalletInfo = useSetRecoilState(walletInfoState);
  const setKeystationRequestType = useSetRecoilState(keystationRequestTypeState);

  const history = useHistory();

  const { getPathWithDepth } = useCurrentPath();

  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const isOpenPopover = Boolean(anchorEl);

  const keystationRequestType = 'headerSignin';

  const handleOnOpenConnect = () => {
    setKeystationRequestType(keystationRequestType);
    setIsOpenedConnect(true);
  };

  const handleOnSuccessConnect = () => {
    if (!getPathWithDepth(2)) history.push(`/${currentChain}/wallet`);
  };

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
                  <img src={chains[currentChain].imgURL} alt={chains[currentChain].name} />
                </div>
                <div className={styles.accountButtonText}>{chains[currentChain].name}</div>
              </div>
              <WidgetsIcon />
            </button>
            {currentWallet.address ? (
              <>
                <button
                  type="button"
                  className={styles.accountButton}
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                  }}
                >
                  <AccountCircleOutlinedIcon />
                </button>
                <Popover
                  anchorEl={anchorEl}
                  open={isOpenPopover}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  sx={{ marginTop: '1rem' }}
                >
                  <div className={styles.popoverContainer}>
                    <div className={styles.popoverTitle}>
                      Address {currentWallet.keystationAccount && `(${currentWallet.keystationAccount})`}
                    </div>
                    <div className={styles.popoverAddressContainer}>
                      <div>{currentWallet.address}</div>
                      <div className={styles.popoverAddressToolButtonContainer}>
                        <IconButton>
                          <ContentCopyIcon />
                        </IconButton>
                        <IconButton>
                          <OpenInNewIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className={styles.popoverButtonContainer}>
                      <Button
                        type="button"
                        variant="outlined"
                        sx={{
                          fontSize: '1.2rem',
                          textTransform: 'none',
                          flex: 1,
                          backgroundColor: '#FFFFFF',
                          color: '#000000',
                          borderColor: '#000000',
                          '&:hover': {
                            backgroundColor: '#000000',
                            color: '#FFFFFF',
                            borderColor: '#000000',
                          },
                        }}
                        onClick={handleOnOpenConnect}
                      >
                        Change Wallet
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        sx={{
                          fontSize: '1.2rem',
                          textTransform: 'none',
                          flex: 1,
                          marginLeft: '0.8rem',
                          backgroundColor: '#000000',
                          color: '#FFFFFF',
                          borderColor: '#000000',
                          '&:hover': {
                            backgroundColor: '#FFFFFF',
                            color: '#000000',
                            borderColor: '#000000',
                          },
                        }}
                        onClick={() => {
                          const defaultWallet = {
                            chain: null,
                            walletType: null,
                            ledgerHDPath: null,
                            keystationAccount: null,
                            address: null,
                            url: null,
                          };

                          setWalletInfo(defaultWallet);
                          setAnchorEl(null);
                          sessionStorage.setItem('wallet', JSON.stringify(defaultWallet));
                          history.push(`/${currentChain}`);
                        }}
                      >
                        Close Wallet
                      </Button>
                    </div>
                  </div>
                </Popover>
              </>
            ) : (
              <button type="button" className={styles.accountButton} onClick={handleOnOpenConnect}>
                <AccountCircleOutlinedIcon />
                <div className={styles.accountButtonText}>Connect Wallet</div>
              </button>
            )}
          </div>
        </div>
      </AppBar>
      <Drawer open={isOpenedDrawer} onClose={() => setIsOpenedDrawer(false)} />
      {isOpenedSelect && <DialogChainSelect open={isOpenedSelect} onClose={() => setIsOpenedSelect(false)} />}
      {isOpenedConnect && (
        <DialogWalletConnect
          open={isOpenedConnect}
          onClose={() => setIsOpenedConnect(false)}
          onSuccess={handleOnSuccessConnect}
          requestType={keystationRequestType}
        />
      )}
    </>
  );
}
