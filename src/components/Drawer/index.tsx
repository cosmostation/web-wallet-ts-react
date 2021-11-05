import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import cx from 'clsx';
import { Drawer as BaseDrawer } from '@mui/material';

import DialogWalletConnect from '~/components/Dialog/DialogWalletConnect';
import type { Menu } from '~/constants/common';
import { DRAWER_WIDTH, MENU } from '~/constants/common';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentPath } from '~/hooks/useCurrentPath';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';

import { ReactComponent as GithubIcon } from './assets/icon_github.svg';
import { ReactComponent as MailIcon } from './assets/icon_mail.svg';
import { ReactComponent as MediumIcon } from './assets/icon_medium.svg';
import { ReactComponent as TelegramIcon } from './assets/icon_telegram.svg';
import { ReactComponent as TwitterIcon } from './assets/icon_twitter.svg';

import styles from './index.module.scss';

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function Drawer({ open, onClose }: DrawerProps) {
  return (
    <>
      <BaseDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            border: 0,
            backgroundColor: 'transparent',
          },
        }}
        open
      >
        <DrawerContent />
      </BaseDrawer>

      <BaseDrawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, backgroundColor: 'black' },
        }}
      >
        <DrawerContent />
      </BaseDrawer>
    </>
  );
}

function DrawerContent() {
  const { t, i18n } = useTranslation();

  const { getPathWithDepth } = useCurrentPath();

  const [isOpenedConnect, setIsOpenedConnect] = useState(false);
  const [clickedMenu, setClickedMenu] = useState<Menu | null>(null);

  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const history = useHistory();

  const handleOnOpenConnect = (menu: Menu) => {
    if (currentWallet.address) {
      history.push(`/${currentChain.path}/${menu}`);
      return;
    }

    setClickedMenu(menu);
    setIsOpenedConnect(true);
  };

  const handleOnSuccess = () => {
    history.push(`/${currentChain.path}/${clickedMenu!}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.logoContainer}>
            <div className={styles.logoImg}>
              <Link to="/">
                <img src="/images/common/logo.png" alt="logo" />
              </Link>
            </div>
            <div className={styles.logoVersion}>{process.env.REACT_APP_VERSION}</div>
          </div>
          <div className={styles.divider} />
          <div className={styles.menuContainer}>
            <ItemButton
              name={t('component.drawer.wallet')}
              imgURL="/images/common/icon_wallet.png"
              onClick={() => handleOnOpenConnect(MENU.WALLET)}
              selected={getPathWithDepth(2) === MENU.WALLET}
            />
            <ItemButton
              name={t('component.drawer.delegate')}
              imgURL="/images/common/icon_delegate.png"
              onClick={() => handleOnOpenConnect(MENU.DELEGATE)}
              selected={getPathWithDepth(2) === MENU.DELEGATE}
            />
            <ItemButton
              name="Explorer"
              imgURL="/images/common/icon_explorer.png"
              onClick={() => window.open(`https://www.mintscan.io/${currentChain.mintscanPath}`, '_blank')}
            />
          </div>
          <button
            type="button"
            className={styles.guideButton}
            onClick={() => {
              if (i18n.language === 'ko') {
                window.open('https://www.cosmostation.io/files/cosmostation_guide_web_ko.pdf', '_blank');
                return;
              }

              window.open('https://www.cosmostation.io/files/cosmostation_guide_web_en.pdf', '_blank');
            }}
          >
            {t('component.drawer.web_wallet_guide')} <sup>PDF</sup>
          </button>
        </div>
        <div>
          <div className={styles.downloadText}>Download Cosmostation App Wallet!</div>
          <div className={styles.storeContainer}>
            <a
              href="https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion"
              target="_blank"
              rel="noreferrer"
            >
              <div className={styles.googlePlay} />
            </a>
            <a href="https://apps.apple.com/app/cosmostation/id1459830339" target="_blank" rel="noreferrer">
              <div className={styles.appStore} />
            </a>
          </div>

          <div className={styles.socialLinkContainer}>
            <a href="https://github.com/cosmostation" target="_blank" className={styles.socialLink} rel="noreferrer">
              <GithubIcon />
            </a>
            <a href="https://medium.com/cosmostation" target="_blank" className={styles.socialLink} rel="noreferrer">
              <MediumIcon />
            </a>
            <a href="https://t.me/cosmostation" target="_blank" className={styles.socialLink} rel="noreferrer">
              <TelegramIcon />
            </a>
            <a href="https://twitter.com/CosmostationVD" target="_blank" className={styles.socialLink} rel="noreferrer">
              <TwitterIcon />
            </a>
            <a href="mailto:support@cosmostation.io" className={styles.socialLink}>
              <MailIcon />
            </a>
          </div>
          <div className={styles.descriptionContainer}>
            <div>
              <a
                href="https://www.cosmostation.io/service_ko.html"
                target="_blank"
                className={styles.descriptionLink}
                rel="noreferrer"
              >
                {t('component.drawer.terms')}
              </a>
            </div>
            <div>
              Powered By{' '}
              <a
                href="https://www.cosmostation.io/"
                target="_blank"
                className={cx(styles.descriptionLink, styles.descriptionLinkUnderLine)}
                rel="noreferrer"
              >
                Cosmostation
              </a>
            </div>
            <div>© 2021 COSMOSTATION</div>
          </div>
        </div>
      </div>
      {isOpenedConnect && (
        <DialogWalletConnect
          open={isOpenedConnect}
          onClose={() => setIsOpenedConnect(false)}
          onSuccess={handleOnSuccess}
        />
      )}
    </>
  );
}

type ItemButtonProps = {
  onClick?: () => void;
  name: string;
  imgURL: string;
  selected?: boolean;
};

function ItemButton({ name, imgURL, onClick, selected }: ItemButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button type="button" className={cx(styles.button, selected && styles.itemSelected)} onClick={onClick}>
        <div className={styles.imgContainer}>
          <img src={imgURL} alt={name} />
        </div>
        <div className={styles.text}>{name}</div>
      </button>
    </div>
  );
}
