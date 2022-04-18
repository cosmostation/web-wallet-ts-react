import './i18n/i18n';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { tendermint } from '@cosmostation/extension-client';

import { chainValues } from '~/constants/chain';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import type { WalletInfo } from '~/stores/wallet';
import { walletInfoState } from '~/stores/wallet';

import reportWebVitals from './reportWebVitals';
import Routes from './Routes';

import '~/styles/normalize.scss';
import styles from './index.module.scss';

ReactGA.initialize('UA-139147805-1');

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <SnackbarProvider
        maxSnack={3}
        variant="success"
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        style={{ fontSize: '1.3rem' }}
      >
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </SnackbarProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function App() {
  const currentWallet = useCurrentWallet();
  const currentChain = useCurrentChain();
  const setWalletInfo = useSetRecoilState(walletInfoState);

  const chains = chainValues.map((chain) => chain.name);

  const joinedChains = chains.join(', ');

  useEffect(() => {
    let event: unknown;
    void (async function async() {
      if (currentWallet.walletType === 'cosmostation-extension') {
        try {
          const provider = await tendermint();

          event = provider.onAccountChanged(() => {
            void (async function changed() {
              const supportedChains = await provider.getSupportedChains();

              if (![...supportedChains.official, ...supportedChains.unofficial].includes(currentChain.extensionId)) {
                await provider.addChain({
                  addressPrefix: currentChain.wallet.prefix,
                  baseDenom: currentChain.denom,
                  displayDenom: currentChain.symbolName,
                  chainId: currentChain.chainId,
                  chainName: currentChain.extensionId,
                  restURL: currentChain.lcdURL,
                  coinGeckoId: currentChain.coingeckoId,
                  coinType: currentChain.wallet.hdPath.split('/')[1],
                  decimals: currentChain.decimal,
                  imageURL: currentChain.imgURL,
                });
              }

              const account = await provider.requestAccount(currentChain.extensionId);

              setWalletInfo((prev) => {
                const next: WalletInfo = {
                  ...prev,
                  keystationAccount: null,
                  address: account.address,
                  walletType: 'cosmostation-extension',
                };

                sessionStorage.setItem('wallet', JSON.stringify(next));

                return next;
              });
            })();
          });
        } catch {
          const defaultWallet = {
            walletType: null,
            HDPath: null,
            keystationAccount: null,
            address: null,
            url: null,
          };

          setWalletInfo(defaultWallet);
          sessionStorage.setItem('wallet', JSON.stringify(defaultWallet));
        }
      }
    })();
    return () => {
      void (async function async() {
        if (currentWallet.walletType === 'cosmostation-extension') {
          const provider = await tendermint();

          provider.offAccountChanged(event);
        }
      })();
    };
  }, [currentWallet.walletType, currentChain, setWalletInfo]);
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Helmet>
          <meta
            name="keywords"
            content={`tendermint, blockchain, validator, staking, node, validator node, cosmos validator, atom, atom staking, cosmos wallet, cosmos explorer, photon, wannabit, cosmostation, delegator, cosmos delegator, airdrop, cryptocurrency, bitcoin, ethereum, dfinity, cosmonaut, staking reward, cosmos staking calculator, cosmos staking, myetherwallet, atom explorer, cosmostation, cosmos blockchain, atom delegate, ${joinedChains}`}
          />
        </Helmet>
        <Routes />
      </div>
    </BrowserRouter>
  );
}
