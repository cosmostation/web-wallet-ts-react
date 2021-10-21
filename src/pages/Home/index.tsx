import { useRecoilValue, useSetRecoilState } from 'recoil';

import Layout from '~/components/Layout';
import Loader from '~/components/Loader';
import { chainState } from '~/stores/chain';
import { walletConnectState } from '~/stores/wallet';

import styles from './index.module.scss';

export default function Home() {
  const setIsConnected = useSetRecoilState(walletConnectState);
  const chain = useRecoilValue(chainState);

  return (
    <Layout>
      {chain}
      <Loader />
      <div className={styles.container}>
        <div className={styles.mainImg} />
        <button type="button" onClick={() => setIsConnected(true)} className={styles.connectButton}>
          Connect Wallet
        </button>
      </div>
    </Layout>
  );
}
