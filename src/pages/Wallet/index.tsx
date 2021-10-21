import Layout from '~/components/Layout';

import styles from './index.module.scss';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>Broadcast</div>
    </Layout>
  );
}
