import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import cx from 'clsx';
import { Drawer as BaseDrawer } from '@mui/material';

import { DRAWER_WIDTH } from '~/constants/common';

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
          display: { md: 'none', lg: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, border: 0 },
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
          display: { md: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        <DrawerContent />
      </BaseDrawer>
    </>
  );
}

function DrawerContent() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoContainer}>
          <div className={styles.logoImg}>
            <Link to="/">
              <img src="/images/common/logo.png" alt="logo" />
            </Link>
          </div>
          <div className={styles.logoVersion}>v5.26.0</div>
        </div>
        <div className={styles.menuContainer}>
          <ItemButton name={t('component.drawer.wallet')} imgURL="/images/common/icon_wallet.png" />
          <ItemButton name={t('component.drawer.delegate')} imgURL="/images/common/icon_delegate.png" />
          <ItemButton name="Broadcast Tx" imgURL="/images/common/icon_broadcast.png" />
          <ItemButton name="Explorer" imgURL="/images/common/icon_explorer.png" />
        </div>
        <button type="button" className={styles.guideButton}>
          {t('component.drawer.web_wallet_guide')} <sup>PDF</sup>
        </button>
      </div>
      <div>
        <div className={styles.downloadText}>Download Cosmostation App Wallet!</div>
        <div className={styles.storeContainer}>
          <a href="h">
            <div className={styles.googlePlay} />
          </a>
          <a href="h">
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
