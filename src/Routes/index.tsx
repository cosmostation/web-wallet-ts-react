import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { chainPaths } from '~/constants/chain';
import { MENU } from '~/constants/common';
import BroadCast from '~/pages/Broadcast';
import Delegate from '~/pages/Delegate';
import Home from '~/pages/Home';
import Wallet from '~/pages/Wallet';

export default function Routes() {
  const chainPathOr = chainPaths.join('|');

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/cosmos" />} />
        <Route exact path={`/:chain(${chainPathOr})`} component={Home} />
        <Route exact path={`/:chain(${chainPathOr})/${MENU.WALLET}`} component={Wallet} />
        <Route exact path={`/:chain(${chainPathOr})/${MENU.DELEGATE}`} component={Delegate} />
        <Route exact path={`/:chain(${chainPathOr})/${MENU.BROATCAST}`} component={BroadCast} />
      </Switch>
    </BrowserRouter>
  );
}
