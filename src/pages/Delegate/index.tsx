import Layout from '~/components/Layout';
import Ad from '~/components/PageSection/Ad';
import AvailableValidator from '~/components/PageSection/AvailableValidator';
import HdPath from '~/components/PageSection/HdPath';
import MyDelegation from '~/components/PageSection/MyDelegation';
import MyUndelegation from '~/components/PageSection/MyUndelegation';
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
            <MyDelegation className={styles.delegationContent} />
            <MyUndelegation className={styles.delegationContent} />
            <AvailableValidator className={styles.delegationContent} />
          </div>
        </div>
      </>
    </Layout>
  );
}
