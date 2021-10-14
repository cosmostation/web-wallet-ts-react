import './i18n/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import reportWebVitals from './reportWebVitals';
import { routes } from './routes';

import '~/styles/normalize.scss';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
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
    <BrowserRouter>
      <Switch>
        {routes.map((route) =>
          route.component ? <Route exact key={route.path} component={route.component} path={route.path} /> : '',
        )}
      </Switch>
    </BrowserRouter>
  );
}
