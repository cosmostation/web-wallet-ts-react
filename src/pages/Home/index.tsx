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

  const handleOnAddTokens = async () => {
    try {
      const provider = await cosmos();
      console.log(
        'deleteAutoSign',
        await provider.addCW20Tokens('juno', [
          { contractAddress: 'juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr' },
        ]),
      );
    } catch {
      console.log('error');
    }
  };

  const handleOnGetTokenBalance = async () => {
    try {
      const provider = await cosmos();
      console.log(
        'deleteAutoSign',
        await provider.getCW20TokenBalance(
          'juno',
          'juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr',
          'juno1gr0e3pj3y6fqvzyfm0qxyw9h5dwfrvh857jaza',
        ),
      );
    } catch {
      console.log('error');
    }
  };

  const handleOnGetTokenInfo = async () => {
    try {
      const provider = await cosmos();
      console.log(
        'deleteAutoSign',
        await provider.getCW20TokenInfo('juno', 'juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr'),
      );
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

        <button type="button" onClick={handleOnAddTokens}>
          add Tokens
        </button>

        <button type="button" onClick={handleOnGetTokenBalance}>
          get token balance
        </button>

        <button type="button" onClick={handleOnGetTokenInfo}>
          get token info
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
