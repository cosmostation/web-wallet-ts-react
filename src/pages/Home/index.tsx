import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import DialogWalletConnect from '~/components/Dialog/DialogWalletConnect';
import Layout from '~/components/Layout';
import { useCurrentChain } from '~/hooks/useCurrentChain';

import styles from './index.module.scss';

export default function Home() {
  const [open, setOpen] = useState(false);

  const currentChain = useCurrentChain();

  const history = useHistory();

  const handleOnOpenConnect = () => setOpen(true);

  const handleOnSuccess = () => {
    history.push(`${currentChain.path}/wallet`);
  };

  return (
    <Layout>
      <>
        <div className={styles.container}>
          <div className={styles.mainImg} />
          <button type="button" onClick={handleOnOpenConnect} className={styles.connectButton}>
            Connect Wallet
          </button>
        </div>
        {open && <DialogWalletConnect open={open} onClose={() => setOpen(false)} onSuccess={handleOnSuccess} />}
      </>
    </Layout>
  );
}
