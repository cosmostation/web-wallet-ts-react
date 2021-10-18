import { useSetRecoilState } from 'recoil';

import Layout from '~/components/Layout';
import { connectState } from '~/stores/wallet';

import styles from './index.module.scss';

export default function Home() {
  const setIsConnected = useSetRecoilState(connectState);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.mainImg} />
        <button type="button" onClick={() => setIsConnected(true)} className={styles.connectButton}>
          Connect Wallet
        </button>
      </div>
    </Layout>
  );
}
