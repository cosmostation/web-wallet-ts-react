import './i18n/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from 'recoil';

import { chainValues } from '~/constants/chain';

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
  const chains = chainValues.map((chain) => chain.name);

  const joinedChains = chains.join(', ');
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
