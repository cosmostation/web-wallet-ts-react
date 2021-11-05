import './i18n/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from 'recoil';

import reportWebVitals from './reportWebVitals';
import Routes from './Routes';

import '~/styles/normalize.scss';
import styles from './index.module.scss';

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
        <App />
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
  return (
    <div className={styles.container}>
      <Routes />
    </div>
  );
}
