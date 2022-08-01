/* eslint-disable no-console */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cosmos } from '@cosmostation/extension-client';

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
    history.push(`/${currentChain.path}/wallet`);
  };

  const handleOnSetAutoSign = async () => {
    try {
      const provider = await cosmos();
      await provider.autoSign.set('cosmos', 30);
    } catch {
      console.log('error');
    }
  };

  const handleOnGetAutoSign = async () => {
    try {
      const provider = await cosmos();
      console.log('getAutoSign', await provider.autoSign.get('cosmos'));
    } catch {
      console.log('error');
    }
  };

  const handleOnDeleteAutoSign = async () => {
    try {
      const provider = await cosmos();
      console.log('deleteAutoSign', await provider.autoSign.delete('cosmos'));
    } catch {
      console.log('error');
    }
  };

  return (
    <Layout>
      <>
        <button type="button" onClick={handleOnSetAutoSign}>
          set
        </button>
        <button type="button" onClick={handleOnGetAutoSign}>
          get
        </button>
        <button type="button" onClick={handleOnDeleteAutoSign}>
          delete
        </button>
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
