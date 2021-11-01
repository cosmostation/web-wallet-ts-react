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
            <div className={styles.delegationTitle}>나의 위임 내역</div>
            <MyDelegation className={styles.delegationContent} />
            <div className={styles.delegationTitle}>나의 위임해제내역</div>
            <MyUndelegation className={styles.delegationContent} />
            <div className={styles.delegationTitle}>위임 가능한 검증인</div>
            <AvailableValidator className={styles.delegationContent} />
          </div>
        </div>
      </>
    </Layout>
  );
}
