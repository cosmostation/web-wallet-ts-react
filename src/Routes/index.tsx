import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { chainPaths } from '~/constants/chain';
import { MENU } from '~/constants/common';
import Delegate from '~/pages/Delegate';
import Home from '~/pages/Home';
import Mobile from '~/pages/Mobile';
import NotFound from '~/pages/NotFound';
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
        <Route exact path="/mobile" component={Mobile} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
