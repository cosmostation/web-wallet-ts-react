import Layout from '~/components/Layout';
import Ad from '~/components/PageSection/Ad';
import AvailableValidator from '~/components/PageSection/AvailableValidator';
import HdPath from '~/components/PageSection/HdPath';
import WalletInfo from '~/components/PageSection/WalletInfo';

import styles from './index.module.scss';

export default function Delegate() {
  return (
    <Layout>
      <>
        <div className={styles.container}>
          <div className={styles.contentContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>지갑 열기</div>
              <Ad />
            </div>
            <HdPath className={styles.hdPath} />
            <WalletInfo className={styles.walletInfo} />
            <div className={styles.withdrawTitle}>전송</div>
            <AvailableValidator />
          </div>
        </div>
      </>
    </Layout>
  );
}
