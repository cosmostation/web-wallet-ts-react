import { useTranslation } from 'react-i18next';

import Layout from '~/components/Layout';
import Ad from '~/components/PageSection/Ad';
import HdPath from '~/components/PageSection/HdPath';
import WalletInfo from '~/components/PageSection/WalletInfo';
import Withdraw from '~/components/PageSection/Withdraw';

import styles from './index.module.scss';

export default function Home() {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>{t('page.wallet.open_wallet')}</div>
            <Ad />
          </div>
          <HdPath className={styles.hdPath} />
          <WalletInfo className={styles.walletInfo} />
          <Withdraw className={styles.withdraw} />
        </div>
      </div>
    </Layout>
  );
}
